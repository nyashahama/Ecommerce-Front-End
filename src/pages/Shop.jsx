import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Wrapper from '../components/Wrapper';
import Header from '../components/Header';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('');
  const [viewCount, setViewCount] = useState(12);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchProducts();
    checkUserAuthentication();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedType, selectedSize, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
      // Extract unique types and sizes from products
      const uniqueTypes = [...new Set(response.data.map(product => product.type))];
      const uniqueSizes = [...new Set(response.data.map(product => product.size))];
      setTypes(uniqueTypes);
      setSizes(uniqueSizes);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedType) {
      filtered = filtered.filter(product => product.type === selectedType);
    }

    if (selectedSize) {
      filtered = filtered.filter(product => product.size === selectedSize);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularityScore - a.popularityScore);
    }

    setFilteredProducts(filtered);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type === selectedType ? '' : type);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? '' : size);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleViewChange = (event) => {
    setViewCount(parseInt(event.target.value));
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

const addToCart = async (product) => {
    if (!user) {
        console.error('User not authenticated');
        navigate('/login');
        return;
    }

    try {
        const cartItem = {
            user: { id: user.id },
            product: { id: product.id },
            quantity: 1
        };
        await axios.post('http://localhost:8080/api/cart', cartItem);
        navigate('/cart');
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
};

  return (
    <div>
      <Wrapper />
      <div className="main-content-wrapper d-flex clearfix">
        <Header />

        <div className="shop_sidebar_area">
          {/* Types */}
          <div className="widget catagory mb-50">
            <h6 className="widget-title mb-30">Types</h6>
            <div className="catagories-menu">
              <ul>
                {types.map((type, index) => (
                  <li key={index} className={selectedType === type ? 'active' : ''}>
                    <a href="#" onClick={() => handleTypeChange(type)}>{type}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sizes */}
          <div className="widget brands mb-50">
            <h6 className="widget-title mb-30">Sizes</h6>
            <div className="widget-desc">
              {sizes.map((size, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={size}
                    checked={selectedSize === size}
                    onChange={() => handleSizeChange(size)}
                  />
                  <label className="form-check-label" htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="widget price mb-50">
            <h6 className="widget-title mb-30">Price</h6>
            <div className="widget-desc">
              <div className="slider-range">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, [priceRange[0], parseInt(e.target.value)])}
                />
                <div className="range-price">R0 - R{priceRange[1]}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="amado_product_area section-padding-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="product-topbar d-xl-flex align-items-end justify-content-between">
                  <div className="total-products">
                    <p>Showing 1-{Math.min(viewCount, filteredProducts.length)} of {filteredProducts.length}</p>
                  </div>
                  <div className="product-sorting d-flex">
                    <div className="sort-by-date d-flex align-items-center mr-15">
                      <p>Sort by</p>
                      <form action="#" method="get">
                        <select name="select" id="sortBydate" onChange={handleSortChange} value={sortBy}>
                          <option value="">Select</option>
                          <option value="price">Price</option>
                          <option value="popularity">Popularity</option>
                        </select>
                      </form>
                    </div>
                    <div className="view-product d-flex align-items-center">
                      <p>View</p>
                      <form action="#" method="get">
                        <select name="select" id="viewProduct" onChange={handleViewChange} value={viewCount}>
                          <option value="12">12</option>
                          <option value="24">24</option>
                          <option value="48">48</option>
                          <option value="96">96</option>
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {filteredProducts.slice(0, viewCount).map(product => (
                <div key={product.id} className="col-12 col-sm-6 col-md-12 col-xl-6">
                  <div className="single-product-wrapper">
                    <div className="product-img">
                      <img src={`/img/bg-img/${product.id}.jpg`} alt={product.name} />
                      {/* You might want to add a hover image if available */}
                    </div>
                    <div className="product-description d-flex align-items-center justify-content-between">
                      <div className="product-meta-data">
                        <div className="line"></div>
                        <p className="product-price">R{product.price}</p>
                        <Link to={`/product-details?id=${product.id}`}>
                          <h6>{product.name}</h6>
                        </Link>
                      </div>
                      <div className="ratings-cart text-right">
                        <div className="ratings">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa fa-star${i < (product.popularityScore / 20) ? '' : '-o'}`} aria-hidden="true"></i>
                          ))}
                        </div>
                        <div className="cart" onClick={addToCart}>
                          <Link to="/cart" data-toggle="tooltip" data-placement="left" title="Add to Cart">
                            <img src="img/core-img/cart.png" alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-12">
                <nav aria-label="navigation">
                  <ul className="pagination justify-content-end mt-50">
                    <li className="page-item active"><a className="page-link" href="#">01.</a></li>
                    <li className="page-item"><a className="page-link" href="#">02.</a></li>
                    <li className="page-item"><a className="page-link" href="#">03.</a></li>
                    <li className="page-item"><a className="page-link" href="#">04.</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Shop;