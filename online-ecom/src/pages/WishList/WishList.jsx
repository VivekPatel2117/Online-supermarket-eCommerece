import React, { useState, useEffect } from "react";
import ProductCard from "../../components/NewProductCart/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./WishList.module.css";
import { useParams } from "react-router-dom";

export default function WishList() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("wishlist");
  const handleActiveTab = (value) => {
    setActiveTab(value);
  };
  const [wishlistData, setWishlistData] = useState([]);
  const recall = () =>{
    handleWishlistData();
}
  const handleWishlistData = () => {
    fetch(`http://127.0.0.1:5000/get_user_wishlist/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setWishlistData(data.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleWishlistData();
  }, []);
  useEffect(() => {
    console.log(wishlistData)
  }, [wishlistData])
  

  return (
    <>
      <Navbar />
      <div className={styles.wishListSturcture}>
        <div className={styles.headingsWishlist}>
          <p
            className={activeTab === "wishlist" ? styles.activeTab : ""}
            onClick={() => handleActiveTab("wishlist")}
          >
            Wishlist items
          </p>
          <p
            className={activeTab === "buyAgain" ? styles.activeTab : ""}
            onClick={() => handleActiveTab("buyAgain")}
          >
            Buy again
          </p>
        </div>
        {activeTab === 'wishlist' ? (
        <div className={styles.wishlistItemsSection}>
              {wishlistData.map((item, index) => (
                <ProductCard
                isDelete={true}
                  key={index}
                  category={item.category}
                  recall={recall}
                  isSeller={false}
                  isMapped={true}
                  imgUrl={item.imgUrl}
                  productId={item._id}
                  price={item.price}
                  quantity={item.quantity}
                  description={item.description}
                  name={item.productName}
                />
              ))}
        </div>
        ):(
          <></>
        )}
      </div>
    </>
  );
}
