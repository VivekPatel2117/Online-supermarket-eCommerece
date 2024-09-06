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
function App() {
  return (
  <>
  <ToastContainer/>
  <BrowserRouter>
  <Routes>
    <Route path='/' index element={<Login/>} />
    <Route path='/buyer' element={<BuyerRegister/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Mycart' element={<Mycart/>} />
    <Route path='/seller' element={<SellerRegister/>}/>
    <Route path='/wishlist' element={<WishList/>}/>
    <Route path='/profileSection/:user_id' element={<ProfileSection/>}/>
    <Route path='/SellerHome' element={<SellerHome/>} />
    <Route path='/productPage/:product_id' element={<ProductPage/>} />
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
