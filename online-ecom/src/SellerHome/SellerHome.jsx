import React, { useState } from "react";
import styles from "./SellerHome.module.css";

import SellerNavbar from "../components/SellerNavbar/SellerNavbar";
import ProductCard from "../components/NewProductCart/ProductCard";
import Modal from "../components/Modal/Modal";
export default function SellerHome() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const handleActiveTab = (value) => {
    setActiveTab(value);
  };
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <SellerNavbar />
      <div className={styles.SellerHomeWrapper}>
        <div className={styles.SellerHomeHeaders}>
          <p
            onClick={() => handleActiveTab("dashboard")}
            className={`${styles.sectionHeaders} ${
              activeTab === "dashboard" ? styles.SellerHomeHeadersActive : ""
            }`}
          >
            Dashboard
          </p>
          <p
            onClick={() => handleActiveTab("inventory")}
            className={`${styles.sectionHeaders} ${
              activeTab === "inventory" ? styles.SellerHomeHeadersActive : ""
            }`}
          >
            Inventory
          </p>
        </div>
        {activeTab === "dashboard" ? (
        <div className={styles.dashboardWrapper}>
          <div className={styles.storePreview}>
            <div className={styles.RecentCustomer}>
              <p style={{ fontSize: "3.5vh",color:"gray" }}>Recent Customers</p>
              <div className={styles.userBoxWrapper}>
                <div className={styles.userBox}>
                  <img src="https://via.placeholder.com/50x50" alt="" />
                  <p>Username</p>
                  <p>amt</p>
                </div>
                <div className={styles.userBox}>
                  <img src="https://via.placeholder.com/50x50" alt="" />
                  <p>Username</p>
                  <p>amt</p>
                </div>
                <div className={styles.userBox}>
                  <img src="https://via.placeholder.com/50x50" alt="" />
                  <p>Username</p>
                  <p>amt</p>
                </div>
                <div className={styles.userBox}>
                  <img src="https://via.placeholder.com/50x50" alt="" />
                  <p>Username</p>
                  <p>amt</p>
                </div>
              </div>
            </div>
            <div className={styles.WeeklyOrders}>
              <p style={{ fontSize: "3.5vh",color:"gray" }}>Weekly orders</p>
              <p>Number of orders</p>
              <h1>Amout</h1>
            </div>
            <div className={styles.Overview}>
              <p style={{ fontSize: "3.5vh",color:"gray" }}>Store overview</p>
              <p>Number of products</p>
              <p>Most sold</p>
            </div>
          </div>
          <div className={styles.cartItems}>
                {/* Mapping function */}
                    <div className={styles.productImg}>
                        <img src={"https://via.placeholder.com/100"} alt="freshmart" />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.descHead}>
                            <h4>Fresh Apples</h4>
                            <p>5 kg</p>
                        </div>
                        <div className={styles.descPrice}>
                            <p> 250</p>
                        </div>
                        <div className={styles.actions}>
                            <div className={styles.updateQuantity}>
                               <p> Mark as completed</p>
                            </div>
                            <div className={styles.removeItem}>
                                <p>Delete</p>
                            </div>
                            <div className={styles.wishlistItem}>
                                <p>Wishlist</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        ):(
            <div className={styles.InventoryWrapper}>
                <h1 style={{display:"flex",alignItems:"center",gap:"2vh"}}>Your Product list - <p onClick={()=>setModalOpen(!modalOpen)}> Add more products</p></h1>
                <div className={styles.InventoryWrapperCards}>
                <ProductCard isSeller={true} />
                <ProductCard isSeller={true} />
                <ProductCard isSeller={true}/>
                <ProductCard isSeller={true}/>
                <ProductCard isSeller={true}/>
                <ProductCard isSeller={true}/>
                <ProductCard isSeller={true}/>
                </div>
            </div>
        )}
      </div>
      <Modal header={"Add your product"} size={"xlarge"} isOpen={modalOpen} onClose={()=>setModalOpen(!modalOpen)}>
        <div className={styles.modalDivWrapper}>
            <ProductCard isSeller={true}/>
            <div className="form">

            </div>
        </div>
      </Modal>
    </>
  );
}
