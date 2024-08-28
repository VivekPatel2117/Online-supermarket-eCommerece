import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.favoriteIcon}>
        <i className="material-icons" style={{ color: 'white' }}>favorite_border</i>
      </div>
      <div className={styles.productImage}>
        <img
          src={product.image}
          alt="Product"
        />
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <div className={styles.productPrice}>{product.price}</div>
        <div className={styles.actionButtons}>
          <button className={styles.buyNowBtn}>Buy Now</button>
          <i className="material-icons" style={{ marginTop: '10px', color: '#e5a72c' }}>add_shopping_cart</i>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
