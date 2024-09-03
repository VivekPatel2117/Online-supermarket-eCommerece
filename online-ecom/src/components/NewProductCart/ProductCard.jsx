import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({isSeller}) => {
    return (
        <div className={styles.card}>
            <img 
                src="https://via.placeholder.com/300x300" 
                alt="Product"
            />
            <div>
            <h3>Hubberholme Men's Oversized Half Sleeve Shirt (Brown, 42)</h3>
            <p className={styles.price}>₹700.00</p>
            <p className={styles.availability}>
                {isSeller ? `Quanity: ${50}`:"In stock"}
            </p>
            <button>{isSeller ? "Boost this Product" :"Move to cart"}</button>
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <a href="#">Delete</a>
            <a href="#">{isSeller ? "Add more Quantity":"Add to list"}</a>
           {!isSeller && (
             <a href="#">See more like this</a>
           )}
            </div>
            </div>
        </div>
    );
}

export default ProductCard;
