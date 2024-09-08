import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import cart, { addToCart, removeFromCart } from "../../stores/cart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function ProductCart({
  ProductImg,
  id,
  ProductQuantity,
  productDesc,
  ProductName,
  ProductPrice,
}) {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/productDetails/${id}`)
  }
  const [pQuantity, setPQuantity] = useState(0)
  const [isClicked, setIsClicked] = useState(false);
  const carts = useSelector((store) => store.cart.item);
  useEffect(() => {
    console.log(carts)
    if(carts.length > 0){
      carts.map((item)=>{
        console.log("PRODUCTID",item.productId,"ID",id)
        if(item.productId === id){
            setIsClicked(true)
            setPQuantity(item.quantity)
        }
      })
    }else{
      setIsClicked(false);
      setPQuantity(0)
    }
      
  }, [carts])
  
  const dispatch = useDispatch();

  const handleCart = () => {
    setIsClicked(true);
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  const add = () => {
      dispatch(addToCart({
        productId: id,
        quantity: 1,  
      }));
  };
  
  const remove = () => {
   
        dispatch(removeFromCart({
          productId: id,
          quantity: 1, 
        }));
        if(pQuantity === 0){
          setIsClicked(false);
          return
        }
  };
  

  const truncateDescription = (description, maxLength) => {
    // Check if the length of the description exceeds the maximum length
    if (description.length > maxLength) {
      // Return the truncated description with ellipsis
      return description.slice(0, maxLength) + "...";
    }
    // Return the original description if it doesn't exceed the maximum length
    return description;
  };
  return (
    <div className={styles.ProductCardWrapper}>
      <div className={styles.productImgWrapper}>
        <img onClick={handleNavigation} src={ProductImg} alt={ProductName} />
      </div>
      <div className={styles.productDesc}>
        <div className={styles.Deschead}>
          <h4>{ProductName}</h4>
          <p>{truncateDescription(productDesc,10)}</p>
        </div>
        <div className={styles.productPrice}>
          <div className={styles.price}>
            <CurrencyRupeeIcon fontSize="small" /> {ProductPrice}
          </div>
          <div className={styles.addToCart}>
            {isClicked ? (
              <div style={{ display: "flex", width: "7vw", borderRadius: "5px", marginRight: "1vw", backgroundColor: "green", justifyContent: "space-evenly", alignItems: "center" }}>
                <div onClick={add}>
                  <AddOutlinedIcon color="white" />
                </div>
                {pQuantity}
                <div onClick={remove} style={{ opacity: carts.quantity === 0 ? 0.5 : 1 }}>
                  <RemoveOutlinedIcon color="white" />
                </div>
              </div>
            ) : (
              <button onClick={handleCart}>Add</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
