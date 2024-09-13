import React, { useState, useEffect } from "react";
import ProductCard from "../../components/NewProductCart/ProductCard";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./WishList.module.css";
import { useParams } from "react-router-dom";

export default function WishList() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("wishlist");
  const handleActiveTab = (value) => {
    handleOrder_history();
    handleWishlistData();
    setActiveTab(value);
  };
  const [subActiveTab, setSubActiveTab] = useState('processing')
  const handleSubActiveTab = (value) =>{
    handleOrder_history();
    handleWishlistData();
    setSubActiveTab(value)
  }
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
      .then((data) => {
        if(data.data || data.data.length > 0) setWishlistData(data.data)
        }
      )
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleWishlistData();
    handleOrder_history();
  }, []);
  const [processingOrderData, setProcessingOrderData] = useState([])
  const [deliveredData, setDeliveredData] = useState([])
  const handleOrder_history = () => {
    fetch(`http://127.0.0.1:5000/get_order_details_user/${localStorage.getItem('id')}`)
      .then((res) => res.json())
      .then((data) => {
        const productDetailsArr = []
        const deliveredProductsArr = []
        data.map((item)=>{
          const timestamp = new Date(item.current_timestamp["$date"]);
          const formattedTimestamp = timestamp.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
          const status = item.status
          item.product_details.map((product)=>{
            if(product.order_status == "pending"){
              productDetailsArr.push({formattedTimestamp,status,...product})
            }
          })
          item.product_details.map((product)=>{
            if(product.order_status == "completed"){
              deliveredProductsArr.push({formattedTimestamp,status,...product})
            }
          })

        })
        if(productDetailsArr.length > 0){
          console.log(productDetailsArr)
          setProcessingOrderData(productDetailsArr)
        }
        if(deliveredProductsArr.length > 0){
          setDeliveredData(deliveredProductsArr)
        }
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      });
  };
  
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
          {wishlistData.length > 0 ? (
            <>
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
            </>
          ):(
            <><h1>No products in wishlist</h1></>
          )}
        </div>
        ):(
          <div>
              <div style={{marginLeft:"2vw"}} className={styles.headingsWishlist}>
          <p
            className={subActiveTab === "processing" ? styles.activeTab : ""}
            onClick={() => handleSubActiveTab("processing")}
          >
            Processing orders
          </p>
          <p
            className={subActiveTab === "delivered" ? styles.activeTab : ""}
            onClick={() => handleSubActiveTab("delivered")}
          >
            Delivered
          </p>
        
               </div>
          <div>
              {subActiveTab === 'processing' ? (
                <div className={styles.wishlistItemsSection}>
                {processingOrderData.length > 0 ? (
                  <>
                  {processingOrderData.map((item,index)=>(
                    <ProductCard
                    isDelete={false}
                    status={item.status}
                    date={item.formattedTimestamp}
                      key={index}
                      category={item.category}
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
                  </>
                ):(
                  <p>No processing orders</p>
                )}
                </div>
              ):subActiveTab === 'delivered' &&(
                <div className={styles.wishlistItemsSection}>
                {deliveredData.length > 0 ? (
                  <>
                   {deliveredData.map((item,index)=>(
                    <ProductCard
                    isDelete={false}
                    status={item.status}
                    date={item.formattedTimestamp}
                      key={index}
                      category={item.category}
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
                  </>
                ):(
                  <p>No delivered orders</p>
                )}
                </div>
              )}
          </div>
          </div>
        )}
      </div>
    </>
  );
}
