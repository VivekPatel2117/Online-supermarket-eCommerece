import React, { useState } from "react";
import Navbar from "./components/Navbar/navbar";
import Slide from "./components/Slider/slide";
import freshmart from "./assets/images/freshmart.png";
import style from "./App.module.css";
import Bevrages from "./assets/images/Beverages.png";
import Vegetables from "./assets/images/Vegetables.png";
import packageFood from "./assets/images/packageFood.png";
import fruits from "./assets/images/fruits.png";
import ProductsSection from "./components/ProductSection/ProductsSection";
export default function App() {
  const [imageArr, setImageArr] = useState([freshmart, freshmart, freshmart]);
  const products = [
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
    { name: 'Product Name', price: '$29.99', image: packageFood },
  ];
  return (
    <>
      <Navbar />
      <Slide images={imageArr} />
      <div className={style.gridWrapper}>
          <div className={style.boxVertical}>
          <img src={Bevrages} alt="beverage" />
          </div>
        <div className={style.horizontalGrid}>
          <div className={style.boxHor}>
          <img src={fruits} alt="fruits" />
          </div>
          <div className={style.boxHor}> <img src={packageFood} alt="fruits" /></div>
          <div className={style.boxHor}> <img src={fruits} alt="fruits" /></div>
          <div className={style.boxHor}> <img src={packageFood} alt="fruits" /></div>
        </div>
          <div className={style.boxVertical}>
          <img src={Vegetables} alt="Vegetables" />
          </div>
      </div>
      <ProductsSection title="Fruits" products={products} />
    </>
  );
}
