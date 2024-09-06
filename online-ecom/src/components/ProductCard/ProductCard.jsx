import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { addToCart, removeFromCart } from "../../stores/cart";

export default function ProductCart({
  ProductImg,
  id,
  ProductQuantity,
  productDesc,
  ProductName,
  ProductPrice,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const carts = useSelector((store) => store.cart.item);
  console.log(carts)
  const [productQuantity, setProductQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleCart = () => {
    setProductQuantity((prevQuantity) => prevQuantity + 1);
    setIsClicked(true);
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };

  const add = () => {
    setProductQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      dispatch(addToCart({
        productId: id,
        quantity: newQuantity,
      }));
      return newQuantity;
    });
  };

  const remove = () => {
    setProductQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 0 ? prevQuantity - 1 : 0;
      if (newQuantity === 0) {
       return;
      } else {
        dispatch(removeFromCart({
          productId: id,
          quantity: 1,
        }));
      }
      return newQuantity;
    });
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
        <img src={ProductImg} alt={ProductName} />
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
                {productQuantity}
                <div onClick={remove} style={{ opacity: productQuantity === 0 ? 0.5 : 1 }}>
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
