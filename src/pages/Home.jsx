import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Wrapper from '../components/Wrapper';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  

  useEffect(() => {
    fetchProducts();
  }, [sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products${sortBy ? `?sortBy=${sortBy}` : ''}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <Wrapper />
      <div className="main-content-wrapper d-flex clearfix">
        <Header />
        <div className="products-catagories-area clearfix">
            <div className="amado-pro-catagory clearfix">

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                    <Link to="/shop">
                        <img src="img/bg-img/1.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R180</p>
                            <h4>Modern Chair</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/2.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R180</p>
                            <h4>Minimalistic Plant Pot</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/3.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R180</p>
                            <h4>Modern Chair</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/4.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R180</p>
                            <h4>Night Stand</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/5.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R18</p>
                            <h4>Plant Pot</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/6.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R320</p>
                            <h4>Small Table</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/7.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R318</p>
                            <h4>Metallic Chair</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/8.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R318</p>
                            <h4>Modern Rocking Chair</h4>
                        </div>
                    </Link>
                </div>

                {/* Single Catagory */}
                <div className="single-products-catagory clearfix">
                <Link to="/shop">
                        <img src="img/bg-img/9.jpg" alt=""/>
                        {/* Hover Content */}
                        <div className="hover-content">
                            <div className="line"></div>
                            <p>From R318</p>
                            <h4>Home Deco</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
      <NewsLetter />
      <Footer />
    </div>
    </div>
  );
};

export default Home;