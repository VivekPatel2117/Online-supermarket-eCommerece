import './App.css'
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login/Login"
import BuyerRegister from './pages/Register/Buyer/buyerRegister';
import Home from './pages/Home/Home';
import Mycart from "./pages/Mycart/Mycart";
import SellerRegister from './pages/Register/Seller/sellerRegister';
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' index element={<Login/>} />
    <Route path='/buyer' element={<BuyerRegister/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Mycart' element={<Mycart/>} />
    <Route path='/seller' element={<SellerRegister/>}/>
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
