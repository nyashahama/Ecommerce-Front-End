import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
          {/* Mobile Nav (max width 767px)*/}
          <div class="mobile-nav">
            {/* Navbar Brand */}
            <div class="amado-navbar-brand">
                <a href="index.html"><img src="img/core-img/logo.png" alt=""/></a>
            </div>
            {/* Navbar Toggler */}
            <div class="amado-navbar-toggler">
                <span></span><span></span><span></span>
            </div>
          </div>
                {/* Header Area Start */}
                <header class="header-area clearfix">
            {/* Close Icon */}
            <div class="nav-close">
                <i class="fa fa-close" aria-hidden="true"></i>
            </div>
            {/* Logo */}
            <div class="logo">
                <a href="index.html"><img src="img/core-img/logo.png" alt=""/></a>
            </div>
            {/* Amado Nav */}
            <nav class="amado-nav">
                <ul>
                    <li class="active"><Link to="/">Home</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/product-details">Product</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/checkout">Checkout</Link></li>
                </ul>
            </nav>
            {/* Button Group */}
            <div class="amado-btn-group mt-30 mb-100">
                <a href="#" class="btn amado-btn mb-15">%Discount%</a>
                <a href="#" class="btn amado-btn active">New this week</a>
            </div>
            {/* Cart Menu */}
            <div class="cart-fav-search mb-100">
                <Link to="/cart" class="cart-nav"><img src="img/core-img/cart.png" alt=""/> Cart <span>(0)</span></Link>
                <a href="#" class="fav-nav"><img src="img/core-img/favorites.png" alt=""/> Favourite</a>
                <a href="#" class="search-nav"><img src="img/core-img/search.png" alt=""/> Search</a>
            </div>
            {/* Social Button */}
            <div class="social-info d-flex justify-content-between">
                <a href="#"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            </div>
        </header>
        {/* Header Area End */}
    </div>
  )
}

export default Header