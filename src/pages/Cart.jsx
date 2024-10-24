import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import NewsLetter from '../components/NewsLetter';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchCartTotal();
    }
  }, [user]);

  const checkUserAuthentication = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('userId');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/cart/${user.id}`);
      setCartItems(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCartTotal = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${user.id}/total`);
      setTotal(response.data);
    } catch (error) {
      console.error('Error fetching cart total:', error);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
        await axios.put(`http://localhost:8080/api/cart/${cartItemId}?quantity=${quantity}`);
        fetchCartItems();
        fetchCartTotal();
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
};

  const removeItem = async (cartItemId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/api/cart/${cartItemId}`);
      await fetchCartItems();
      await fetchCartTotal();
      setError(null);
    } catch (error) {
      console.error('Error removing item:', error);
      setError('Failed to remove item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !cartItems.length) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Wrapper />
      <div className="main-content-wrapper d-flex clearfix">
        <Header />
        <div className="cart-table-area section-padding-100">
          <div className="container-fluid">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="cart-title mt-50">
                  <h2>Shopping Cart</h2>
                </div>
                <div className="cart-table clearfix">
                  {cartItems.length === 0 ? (
                    <div className="alert alert-info">Your cart is empty</div>
                  ) : (
                    <table className="table table-responsive">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.id}>
                            <td className="cart_product_img">
                              <img src={`/img/bg-img/${item.product.id}.jpg`} alt={item.product.name} />
                            </td>
                            <td className="cart_product_desc">
                              <h5>{item.product.name}</h5>
                            </td>
                            <td className="price">
                              <span>R{item.product.price}</span>
                            </td>
                            <td className="qty">
                              <div className="qty-btn d-flex">
                                <div className="quantity">
                                  <span 
                                    className="qty-minus" 
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  >
                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                  </span>
                                  <input
                                    type="number"
                                    className="qty-text"
                                    step="1"
                                    min="1"
                                    max="300"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                    readOnly
                                  />
                                  <span 
                                    className="qty-plus" 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button 
                                className="btn btn-danger"
                                onClick={() => removeItem(item.id)}
                                disabled={loading}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="cart-summary">
                  <h5>Cart Total</h5>
                  <ul className="summary-table">
                    <li><span>total:</span> <span>R{total.toFixed(2)}</span></li>
                  </ul>
                  <div className="cart-btn mt-100">
                    <button 
                      onClick={() => navigate('/checkout')} 
                      className="btn amado-btn w-100"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Cart;