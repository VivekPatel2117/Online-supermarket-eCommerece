import React,{useState} from 'react'
import ProductCard from '../../components/NewProductCart/ProductCard'
import Navbar from '../../components/Navbar/Navbar'
import styles from "./WishList.module.css";

export default function WishList() {
const [activeTab, setActiveTab] = useState("wishlist");
const handleActiveTab =(value)=>{
    setActiveTab(value)
}
    return (
    <>
        <Navbar/>
    <div className={styles.wishListSturcture}>
        <div className={styles.headingsWishlist}>
            <p className={ activeTab === "wishlist" ? styles.activeTab : ""} onClick={()=>handleActiveTab("wishlist")}>Wishlist items</p>
            <p className={ activeTab === "buyAgain" ? styles.activeTab : ""} onClick={()=>handleActiveTab("buyAgain")}>Buy again</p>
        </div>
        <div className={styles.wishlistItemsSection}>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              
        </div>
    </div>
    </>
  )
}
