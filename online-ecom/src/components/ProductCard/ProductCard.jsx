import React from 'react'
import styles from "./ProductCard.module.css";
export default function ProductCart({ProductImg,ProductName,ProductQuantity,ProductPrice}) 
{
  return (
    <div className={styles.ProductCardWrapper}>
        <div className={styles.productImgWrapper}>
            <img src={ProductImg} alt="amul butter" />
        </div>
        <div className={styles.productDesc}>
            <div className={styles.Deschead}>
                <h4>{ProductName}</h4>
                <p>{ProductQuantity}</p>
            </div>
            <div className={styles.productPrice}>
                <div className={styles.price}>
                    {ProductPrice}
                </div>
                <div className={styles.addToCart}>
                    <button>Add</button>
                </div>
            </div>

        </div>
    </div>
  )
}
