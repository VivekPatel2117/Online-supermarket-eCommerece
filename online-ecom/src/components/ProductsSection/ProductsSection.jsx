import React,{useState,useRef} from 'react'
import styles from './ProductSection.module.css'
import ProductCard from '../ProductCard/ProductCard'
import amul from "../../assets/amul.jpg"
export default function ProductsSection({products,title}) {
   const [pro, setPro] = useState([
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500},
        {img:amul,name:"amul butter",quantity:"500g",price:500}
    ])
    const productsRef = useRef(null);
    const [isRightClicked, setIsRightClicked] = useState(false)
  const scrollLeft = () => {
    if (productsRef.current) {
      productsRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    setIsRightClicked(true)
    if (productsRef.current) {
      productsRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };


  return (
    <div className={styles.ProductsSectionWrapper}>
        <div className={styles.ProductsSectionHeading}>
            <h1>{title}</h1>
        </div>
        <div className={styles.ProductsSectionProduct}>
            <div onClick={scrollLeft} style={{visibility: isRightClicked ? "visible" : "hidden"}} className={styles.left}>{"<"}</div>
            <div className={styles.products} ref={productsRef}>
                {pro.map((item,index)=>(
                    <ProductCard key={index} ProductImg={item.img} ProductName={item.name} ProductPrice={item.price} ProductQuantity={item.quantity}/>
                ))}
            </div>
            <div onClick={scrollRight} className={styles.right}>{">"}</div>
        </div>
    </div>
  )
}
