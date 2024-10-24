import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Wrapper from '../components/Wrapper'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const ProductDetails = () => {
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [addingToCart, setAddingToCart] = useState(false)
    const [error, setError] = useState(null)
    const { id } = useParams()  // Added this
    const location = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      checkUserAuthentication();
    }, []);

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
  
    // Modified handleAddToCart function to use quantity state
    const handleAddToCart = async () => {
      if (!user) {
          console.error('User not authenticated');
          navigate('/login');
          return;
      }

      setAddingToCart(true);
      try {
          const cartItem = {
              user: { id: user.id },
              product: { id: product.id },
              quantity: quantity  // Using the quantity state
          };
          await axios.post('http://localhost:8080/api/cart', cartItem);
          navigate('/cart');
      } catch (error) {
          console.error('Error adding product to cart:', error);
          setError('Failed to add product to cart. Please try again.');
      } finally {
          setAddingToCart(false);
      }
    };

    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true)
        setError(null)
        try {
          const productId = id || new URLSearchParams(location.search).get('id')
          if (!productId) {
            throw new Error('Product ID is missing')
          }
          const response = await axios.get(`http://localhost:8080/api/products/${productId}`)
          setProduct(response.data)
        } catch (error) {
          console.error('Error fetching product:', error)
          setError(error.message || 'An error occurred while fetching the product')
        } finally {
          setLoading(false)
        }
      }

      fetchProduct()
    }, [id, location])  // Added dependencies

    const handleQuantityChange = (change) => {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + change
        return newQuantity > 0 ? newQuantity : 1
      })
    }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  if (!product) {
    return (
      <div className="alert alert-warning" role="alert">
        Product not found
      </div>
    )
  }

  return (
    <div>
      <Wrapper/>
      <div className="main-content-wrapper d-flex clearfix">
        <Header/>
        <div className="single-product-area section-padding-100 clearfix">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mt-50">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/shop">Shop</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-7">
                <div className="single_product_thumb">
                  <img className="d-block w-100" src={`/img/bg-img/${product.id}.jpg`}alt={product.name}/>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="single_product_desc">
                  <div className="product-meta-data">
                    <div className="line"></div>
                    <p className="product-price">R{product.price}</p>
                    <h6>{product.name}</h6>
                    <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                      <div className="ratings">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`fa fa-star${i < (product.popularityScore / 20) ? '' : '-o'}`} aria-hidden="true"></i>
                        ))}
                      </div>
                      <div className="review">
                        <a href="#">Write A Review</a>
                      </div>
                    </div>
                    <p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
                  </div>

                  <div className="short_overview my-5">
                    <p>{product.description}</p>
                  </div>

                  <form className="cart clearfix" onSubmit={(e) => e.preventDefault()}>
        <div className="cart-btn d-flex mb-50">
          <p>Qty</p>
          <div className="quantity">
            <span className="qty-minus" onClick={() => handleQuantityChange(-1)}><i className="fa fa-caret-down" aria-hidden="true"></i></span>
            <input type="number" className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" value={quantity} readOnly/>
            <span className="qty-plus" onClick={() => handleQuantityChange(1)}><i className="fa fa-caret-up" aria-hidden="true"></i></span>
          </div>
        </div>
        <button 
          type="button" 
          onClick={handleAddToCart} 
          className="btn amado-btn"
          disabled={addingToCart}
        >
          {addingToCart ? 'Adding to cart...' : 'Add to cart'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter/>
      <Footer/>
    </div>
  )
}

export default ProductDetails