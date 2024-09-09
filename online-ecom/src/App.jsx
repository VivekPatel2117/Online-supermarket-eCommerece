import './App.css'
import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login/Login"
import BuyerRegister from './pages/Register/Buyer/buyerRegister';
import Home from './pages/Home/Home';
import Mycart from "./pages/Mycart/Mycart";
import SellerRegister from './pages/Register/Seller/sellerRegister';
import WishList from './pages/WishList/WishList';
import ProfileSection from './pages/ProfileSection/ProfileSection';
import { ToastContainer } from 'react-toastify';
import SellerHome from './pages/SellerHome/SellerHome';
import ProductPage from './pages/ProductPage/ProductPage';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import About from './pages/About/About';
import TermsAndConditions from './pages/terms/TermsAndConditions';
import Payment from './pages/payment/payment';
function App() {
  return (
  <>
  <ToastContainer/>
  <BrowserRouter>
  <Routes>
    <Route path='/' index element={<Login/>} />
    <Route path='/buyer' element={<BuyerRegister/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Mycart/:user_id' element={<Mycart/>} />
    <Route path='/seller' element={<SellerRegister/>}/>
    <Route path='/wishlist/:id' element={<WishList/>}/>
    <Route path='/profileSection/:user_id' element={<ProfileSection/>}/>
    <Route path='/SellerHome' element={<SellerHome/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/productPage/:category' element={<ProductPage/>} />
    <Route path='/productDetails/:id' element={<ProductDetails/>} />
    <Route path='/terms' element={<TermsAndConditions/>} />
    <Route path='/payment/:amount' element={<Payment/>} />
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
