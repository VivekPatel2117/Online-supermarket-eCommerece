import React, { useEffect, useState } from "react";
import styles from "./Mycart.module.css";
import Navbar from "../../components/Navbar/Navbar";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import fruits from "../../assets/fruits.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function Mycart() {
    const [productDetails, setProductDetails] = useState([])
  const products = useSelector((store) => store.cart.item);
  useEffect(() => {
    if (products.length > 0) {
      products.map((item) => {
        handleProductDetails(item.productId,item.quantity)
      });
    }
  }, []);
  const addItem = (newItem) => {
    setProductDetails((prevItems) => [...prevItems, newItem]);
  };

  const handleProductDetails = (id, quantity) => {
    fetch(`http://127.0.0.1:5000/get_product_details/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const details = data.data;
        const values = { ...details, addedQuantity: quantity };
       addItem(values)
      }) .catch((err)=>toast.error("Error while laoding",{autoClose:3000,position:"top-center"}))
  
  };
 
  const navigate = useNavigate();
  const handleNavigation = (id) =>{
    navigate(`/productDetails/${id}`)
  }
  const [recommended, setRecommended] = useState([])
  const {user_id} = useParams();
  const getRecommendedProducts = () =>{
    let category = []
    console.log(productDetails)
    if(productDetails.length < 0) return;
    productDetails.map((item)=>{
        if(!category.includes(item.category)){
            category.push(item.category)
        }
    })
    console.log(category)
    fetch(`http://127.0.0.1:5000/get_recommended/${user_id}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            category:category
        })
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        if(data.category != null){
            setRecommended((pre)=>[...pre,...data.category])
        }else if(data.wishlist != null){
            setRecommended((pre)=>[...pre,...data.wishlist])
        }
    })
    .catch((err)=>toast.error("Error while laoding",{autoClose:3000,position:"top-center"}))
  }
  useEffect(() => {
    getRecommendedProducts();
  }, [productDetails])
  useEffect(() => {
    if(recommended.length > 0){
        recommended.map((item)=>{
            
        })
    }
  }, [recommended])
  
  return (
    <div style={{ backgroundColor: "rgb(246 241 241)" }}>
      <Navbar />
      <div className={styles.MycartWrapper}>
        <div className={styles.headings}>
          <h1>Shopping cart</h1>
        </div>
        <div className={styles.structure}>
          <div className={styles.carts}>
            {/* Mapping function */}
            {productDetails.length > 0 && (
              <>
                {productDetails.map((item) => (
                  <>
                    <div className={styles.cartItems}>
                      <div className={styles.productImg}>
                        <img onClick={()=>handleNavigation(item._id)} src={item.imgUrl} alt="freshmart" />
                      </div>
                      <div className={styles.description}>
                        <div className={styles.descHead}>
                          <h4>{item.productName}</h4>
                          <p>{item.addedQuantity}</p>
                        </div>
                        <div className={styles.descPrice}>
                          <p>
                            {" "}
                            <CurrencyRupee />
                            {item.price * item.addedQuantity}
                          </p>
                        </div>
                        <div className={styles.actions}>
                          <div className={styles.updateQuantity}>
                            <button>
                              <AddIcon />
                            </button>
                            <p>{item.addedQuantity}</p>
                            <button>
                              <RemoveIcon />
                            </button>
                          </div>
                          <div className={styles.removeItem}>
                            <p>Delete</p>
                          </div>
                          <div className={styles.wishlistItem}>
                            <p>Wishlist</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </>
            )}

           
          </div>
          <div className={styles.recommended}>
            <div className={styles.subTotal}>
              <div className={styles.subtotalAmt}>
                <p>Subtotal Items (5): </p>
                <CurrencyRupee />
                <span>500</span>
              </div>
              <div className={styles.proceedToBuyBTtn}>
                <button>Proceed to buy</button>
              </div>
            </div>
            <div className={styles.pairUpItems}>
              <h1 style={{ marginTop: "2vh" }}>Pair with your cart</h1>
              <div className={styles.itemsBox}>
                <div className={styles.imgBox}>
                  <img src={fruits} alt="fruits" />
                </div>
                <div className={styles.itemsBoxDesc}>
                  <h4>American apple fresh from farms</h4>
                  <p>
                    <CurrencyRupee />
                    399.00
                  </p>
                  <div className={styles.addCart}>
                    <button>Add to cart</button>
                  </div>
                </div>
              </div>

              <div className={styles.itemsBox}>
                <div className={styles.imgBox}>
                  <img src={fruits} alt="fruits" />
                </div>
                <div className={styles.itemsBoxDesc}>
                  <h4>American apple fresh from farms</h4>
                  <p>
                    <CurrencyRupee />
                    399.00
                  </p>
                  <div className={styles.addCart}>
                    <button>Add to cart</button>
                  </div>
                </div>
              </div>

              <div className={styles.itemsBox}>
                <div className={styles.imgBox}>
                  <img src={fruits} alt="fruits" />
                </div>
                <div className={styles.itemsBoxDesc}>
                  <h4>American apple fresh from farms</h4>
                  <p>
                    <CurrencyRupee />
                    399.00
                  </p>
                  <div className={styles.addCart}>
                    <button>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
