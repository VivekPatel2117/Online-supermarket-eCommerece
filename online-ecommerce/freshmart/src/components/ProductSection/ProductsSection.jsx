import { useEffect } from 'react';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import style from './ProductsSection.module.css';

const ProductsSection = ({ title, products }) => {
  useEffect(() => {
    const scroll_section = document.querySelector(".scrollable_div");
    const leftBtn = document.querySelector(".left_arrow");
    const rightBtn = document.querySelector(".right_arrow");
    leftBtn.addEventListener("click", () => {
      scroll_section.scrollBy({
        left: -150,
        behavior: "smooth",
      });
      console.log("left");
    });
    rightBtn.addEventListener("click", () => {
      scroll_section.scrollBy({
        left: 200,
        behavior: "smooth",
      });
      console.log("left");
    });
  
 
  }, [])
  
  return (
    <div className={style.products_section}>
      <div className={style.headings}><h1>{title}</h1></div>
      <div className={style.headings}>
        <div className={style.left_right}>
          <i className={`material-icons ${style.left_arrow}`}>arrow_back_ios</i>
        </div>
        <div className={style.scrollable_div}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <div className={style.left_right}>
          <i className={`material-icons ${style.left_arrow}`}>arrow_forward_ios</i>
        </div>
      </div>
    </div>
        
      );
    };

export default ProductsSection;
