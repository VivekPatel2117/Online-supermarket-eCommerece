import React,{useState,useEffect} from 'react';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ProductDetails.module.css";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ProductDetails() {
    const {id} = useParams();
    const [details, setDetails] = useState({})
    const handleDetails = () =>{
        fetch(`http://127.0.0.1:5000/get_product_details/${id}`,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
          setDetails(data.data)  
        })
        .catch((err)=>{
            console.log(err)
            toast.error("Internl error occured",{autoClose:3000,position:"top-center"})
        })
    }
    useEffect(() => {
      window.scrollTo(0, 0);
      handleDetails()
    }, [])
    const [isAvailable, setIsAvailable] = useState(true)
    useEffect(() => {
      console.log(details)
      if(details.quantity < 0){
        setIsAvailable(false)
      }
    }, [details])
   const handleWishlist=()=>{
    fetch(`http://127.0.0.1:5000/add_to_wishlist/${localStorage.getItem("id")}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            details:id
        })
    })
    .then((res)=> {
        if(res.ok){
            toast.success("Product added to wishlist",{autoClose:3000,position:"top-right"})
        }
    })
    .catch((err)=>{
        toast.error("Error while adding to wishlist",{autoClose:3000,position:"top-right"})
    })
   }
  return (
    <>
        <Navbar/>
    <div className={styles.ProductDetailsWrapper}>
    <div className={styles.leftSection}>
        <div className={styles.imgDiv}>
            <img src={details.imgUrl} alt="product" />
        </div>
        <div className={styles.productDesc}>
            <div className={styles.descHeader}>
                <h1 style={{color:'black'}}>Description</h1>
                <p style={{color:'#000000ba'}}>
                {details.description}
                </p>
            </div>
        </div>
    </div>
    <div className={styles.rightSection}>
        <div className={styles.productName}>
            <h1 style={{color:'black'}}>{details.productName}<br />
            <p>₹ {details.price}</p></h1>
        </div>
        <p style={{color:isAvailable ? "green" : "red"}}>{isAvailable ? "In stock" : "Out of stock"}</p>
        <div className={styles.wishlistButton}>
            <button onClick={handleWishlist}>Wishlist product</button>
            <button>Add to cart</button>
        </div>
        <div className={styles.buynowBtn}>
            <button>Buy Now</button>
        </div>
    </div>
    </div>
    </>
  )
}
