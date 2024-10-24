import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewsLetter from './components/NewsLetter';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login';
import Registration from './Registration';
import Random from './Random';




function App() {



  return (
    <BrowserRouter>
    <div>
     {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
     {/* <Footer />*/}
    </div>
  </BrowserRouter>
  );
}

export default App;
