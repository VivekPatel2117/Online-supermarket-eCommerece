import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = () => {
    return (
        <div className={styles.card}>
            <img 
                src="https://via.placeholder.com/300x300" 
                alt="Product"
            />
            <div>
            <h3>Hubberholme Men's Oversized Half Sleeve Shirt (Brown, 42)</h3>
            <p className={styles.price}>₹700.00</p>
            <p className={styles.availability}>In stock</p>
            <button>Move to cart</button>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <a href="#">Delete</a>
            <a href="#">Add to list</a>
            <a href="#">See more like this</a>
            </div>
            </div>
        </div>
    );
}

export default ProductCard;
