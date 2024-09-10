import './App.css'
import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
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
import Logout from './pages/Logout/Logout';
import ProtectedRoute from './pages/protectedRoute'; // Import ProtectedRoute component

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' index element={<Login />} />
          <Route path='/buyer' element={<BuyerRegister />} />
          <Route path='/seller' element={<SellerRegister />} />

          {/* Protected Routes */}
          <Route
            path='/Home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/Mycart/:user_id'
            element={
              <ProtectedRoute>
                <Mycart />
              </ProtectedRoute>
            }
          />
          <Route
            path='/wishlist/:id'
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profileSection/:user_id'
            element={
              <ProtectedRoute>
                <ProfileSection />
              </ProtectedRoute>
            }
          />
          <Route
            path='/SellerHome'
            element={
              <ProtectedRoute>
                <SellerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path='/about'
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path='/productPage/:category'
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/productDetails/:id'
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/terms'
            element={
              <ProtectedRoute>
                <TermsAndConditions />
              </ProtectedRoute>
            }
          />
          <Route
            path='/payment/:amount'
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path='/logout'
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
