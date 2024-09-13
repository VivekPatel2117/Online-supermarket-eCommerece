import React,{useState,useEffect} from "react";
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
import Footer from "../../components/Footer/Footer";
import Grains from "../../assets/grains.jpg"
import SearchPage from "../../components/SearchPage/SearchPage";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const imgArr = [img1, img2, img3];
  const [searchInput, setSearchInput] = useState(null)
  const handleChange =(value)=>{
    setSearchInput(value)
  }
  const navigate = useNavigate();
  const [showSearchPage, setShowSearchPage] = useState(false);
  const handleNavigation = (value) =>{
    navigate(`/productPage/${value}`)
  }
  useEffect(() => {
    if (searchInput && searchInput !== "") {
      const timer = setTimeout(() => {
        setShowSearchPage(true);
      }, 3000); // Add a 3-second delay

      // Cleanup the timer when component unmounts or searchInput changes
      return () => clearTimeout(timer);
    } else {
      setShowSearchPage(false);
    }
  }, [searchInput]);
  return (
    <div className={styles.HomeWrapper}>
      <Navbar handleChange={handleChange} />
      {searchInput!=null && searchInput !="" ? (
        <>
        {showSearchPage ? (
          <SearchPage query={searchInput} />  
        ) : (
          <p>Loading...</p> 
        )}
        </>
      ):(
        <>
      <Slider images={imgArr} />
      <div className={styles.productCategoryGrid}>
        <div  className={styles.verticalBox}>
          <img onClick={()=>handleNavigation("drinks")} src={Bevrages} alt="bevrages" />
        </div>
        <div className={styles.horizontalBoxGrid}>
          <div className={styles.horizontalBox}>
            <img onClick={()=>handleNavigation("Grains")} src={Grains} alt="fruits" />
          </div>
          <div className={styles.horizontalBox}>
            <img onClick={()=>handleNavigation("Dairy")} src={DairyProducts} alt="package food" />
          </div>
          <div className={styles.horizontalBox}>
            <img onClick={()=>handleNavigation("Chips")} src={packageFood} alt="fruits" />
          </div>
          <div className={styles.horizontalBox}>
            <img onClick={()=>handleNavigation("Fruits")} src={fruits} alt="dairy products" />
          </div>
        </div>
        <div className={styles.verticalBox}>
          <img onClick={()=>handleNavigation("Vegetables")} src={Vegetables} alt="vegetables" />
        </div>
      </div>
      <div style={{display:"grid",gridTemplateRows:"auto"}}>
      <ProductsSection constraint={"Dairy"} title={"Breads & Dairy"} />
      <ProductsSection constraint={"Chips"} title={"Snacks and Binge eatables"} />
      <ProductsSection constraint={"Vegetables"} title={"Everyday Essentails Veggis"} />
      
      </div>
      <Footer/>
        </>
      )}
    </div>
  );
}
