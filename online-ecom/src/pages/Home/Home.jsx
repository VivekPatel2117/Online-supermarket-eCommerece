import React from "react";
import styles from "./Home.module.css";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import Slider from "../../components/Slider/Slider";
import img1 from "../../assets/2.png";
import img2 from "../../assets/3.png";
import img3 from "../../assets/4.png";
import fruits from "../../assets/fruits.png";
import packageFood from "../../assets/packageFood.png";
import Bevrages from "../../assets/Beverages.png";
import DairyProducts from "../../assets/DairyProducts.png";
import Vegetables from "../../assets/Vegetables.png";
import Navbar from "../../components/Navbar/Navbar";
export default function Home() {
  const imgArr = [img1, img2, img3];
  return (
    <div className={styles.HomeWrapper}>
      <Navbar />
      <Slider images={imgArr} />
      <div className={styles.productCategoryGrid}>
        <div className={styles.verticalBox}>
          <img src={Bevrages} alt="bevrages" />
        </div>
        <div className={styles.horizontalBoxGrid}>
          <div className={styles.horizontalBox}>
            <img src={DairyProducts} alt="fruits" />
          </div>
          <div className={styles.horizontalBox}>
            <img src={DairyProducts} alt="package food" />
          </div>
          <div className={styles.horizontalBox}>
            <img src={packageFood} alt="fruits" />
          </div>
          <div className={styles.horizontalBox}>
            <img src={fruits} alt="dairy products" />
          </div>
        </div>
        <div className={styles.verticalBox}>
          <img src={Vegetables} alt="vegetables" />
        </div>
      </div>
      <div style={{display:"grid",gridTemplateRows:"auto"}}>
      <ProductsSection title={"Best Selling"} />
      <ProductsSection title={"Featured"} />
      <ProductsSection title={"Everyday Essentails"} />
      <ProductsSection title={"For you"} />
      </div>
    </div>
  );
}
