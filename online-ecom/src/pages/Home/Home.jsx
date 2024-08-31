import React from 'react'
import ProductsSection from '../../components/ProductsSection/ProductsSection'
import Slider from '../../components/Slider/Slider'
import img1 from "../../assets/2.png";
import img2 from "../../assets/3.png";
import img3 from "../../assets/4.png";
import Navbar from '../../components/Navbar/Navbar';
export default function Home() {
    const imgArr = [img1,img2,img3]
  return (
    <div>
        <Navbar/>
        <Slider images={imgArr}/>
        <ProductsSection title={"Best Selling"} />
    </div>
  )
}
