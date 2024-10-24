import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Wrapper from '../components/Wrapper'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import axios from 'axios'

const Checkout = () => {
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkUserAuthentication();
    }, []);

    useEffect(() => {
        if (user) {
           // fetchCartItems();
            fetchCartTotal();
        }
    }, [user]);
    const fetchCartTotal = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/cart/${user.id}/total`);
            setTotal(response.data);
        } catch (error) {
            console.error('Error fetching cart total:', error);
        }
    };

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
  return (
    <div>

<Wrapper/>
    {/* ##### Main Content Wrapper Start ##### */}
    <div className="main-content-wrapper d-flex clearfix">

       
    <Header/>

        <div className="cart-table-area section-padding-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="checkout_details_area mt-50 clearfix">

                            <div className="cart-title">
                                <h2>Checkout</h2>
                            </div>

                            <form action="#" method="post">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" id="first_name"  placeholder="First Name" required/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" id="last_name"  placeholder="Last Name" required/>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="text" className="form-control" id="company" placeholder="Company Name" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="email" className="form-control" id="email" placeholder="Email" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <select className="w-100" id="country">
                                        <option value="usa">United States</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="ger">Germany</option>
                                        <option value="fra">France</option>
                                        <option value="ind">India</option>
                                        <option value="aus">Australia</option>
                                        <option value="bra">Brazil</option>
                                        <option value="cana">Canada</option>
                                    </select>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="text" className="form-control mb-3" id="street_address" placeholder="Address" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="text" className="form-control" id="city" placeholder="Town" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" id="zipCode" placeholder="Zip Code" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="number" className="form-control" id="phone_number" min="0" placeholder="Phone No" />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <textarea name="comment" className="form-control w-100" id="comment" cols="30" rows="10" placeholder="Leave a comment about your order"></textarea>
                                    </div>

                                    <div className="col-12">
                                        <div className="custom-control custom-checkbox d-block mb-2">
                                            <input type="checkbox" className="custom-control-input" id="customCheck2"/>
                                            <label className="custom-control-label" for="customCheck2">Create an accout</label>
                                        </div>
                                        <div className="custom-control custom-checkbox d-block">
                                            <input type="checkbox" className="custom-control-input" id="customCheck3"/>
                                            <label className="custom-control-label" for="customCheck3">Ship to a different address</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Cart Total</h5>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>R{total.toFixed(2)-(0,15)}</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>total:</span> <span>R{total.toFixed(2)}</span></li>
                            </ul>

                            <div className="payment-method">
                                {/* Cash on delivery */}
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <input type="checkbox" className="custom-control-input" id="cod" checked/>
                                    <label className="custom-control-label" for="cod">Cash on Delivery</label>
                                </div>
                                {/* Paypal */}
                                <div className="custom-control custom-checkbox mr-sm-2">
                                    <input type="checkbox" className="custom-control-input" id="paypal"/>
                                    <label className="custom-control-label" for="paypal">Paypal <img className="ml-15" src="img/core-img/paypal.png" alt=""/></label>
                                </div>
                            </div>

                            <div className="cart-btn mt-100">
                                <a href="#" className="btn amado-btn w-100">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* ##### Main Content Wrapper End ##### */}

   

    <Footer/>


    </div>
  )
}

export default Checkout