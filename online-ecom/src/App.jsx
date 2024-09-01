import './App.css'
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login/Login"
import BuyerRegister from './pages/Register/Buyer/buyerRegister';
import Home from './pages/Home/Home';
// import { ToastContainer } from 'react-toastify';
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' index element={<Login/>} />
    <Route path='/buyer' element={<BuyerRegister/>} />
    <Route path='/Home' element={<Home/>} />
  </Routes>
  </BrowserRouter>
  </>
  )
}

export default App
