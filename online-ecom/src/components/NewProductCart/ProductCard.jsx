import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import Modal from "../Modal/Modal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../stores/cart";
const ProductCard = ({
  isSeller,
  imgUrl,
  category,
  isDelete,
  productId,
  description,
  name,
  price,
  quantity,
  heightVal,
  quantityMinus,
  quantityAdd,
  isMapped,
  recall
}) => {
  const carts = useSelector((store) => store.cart.item);
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(
      addToCart({
        productId: productId,
        quantity: 1,
        price:price
      })
    );
  };
  const handleToast = () =>{
    console.log(isSeller)
    if(!isSeller){
      handleCart();
      toast.success("Added to cart",{autoClose:3000,position:'top-center'})
    }
    toast.error("Feature coming soon",{autoClose:3000,position:"top-center"})
  }
  const [quantityModal, setQuantityModal] = useState(false);
  const [quantityValue, setQuantityValue] = useState(quantity);
  const [deleteModal, setDeleteModal] = useState(false)
  const handleQuantityChangeMinus = () => {
    if (quantityValue === 0) {
      setQuantityValue(0);
    } else if (quantityValue > 0) {
      setQuantityValue(quantityValue - 1);
    }
  };
  const handleQuantityChangeAdd = () => {
    if (quantityValue >= 0) {
      setQuantityValue(quantityValue + 1);
    }
  };
  const handleUpdate = async () =>{
    const response = await fetch(`http://127.0.0.1:5000/update_product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "quantity":quantityValue,
      }),
    });
    if(response.status === 200){
      setQuantityModal(false)
      toast.success("Quantity updated successfully",{autoClose:3000,position:"top-center"})
    }else{
      toast.error("Error while upating quantity",{autoClose:3000,position:"top-center"})
    }
  }
  const handleWishlist=()=>{
    fetch(`http://127.0.0.1:5000/add_to_wishlist/${localStorage.getItem("id")}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            details:productId
        })
    })
    .then((res)=> {
        if(res.status === 200){
            toast.success("Product added to wishlist",{autoClose:3000,position:"top-right"})
        }
    })
    .catch((err)=>{
        toast.error("Error while adding to wishlist",{autoClose:3000,position:"top-right"})
    })
   }
  const handleDeleteProduct = async () =>{
    if(isSeller){
      const response = await fetch(`http://127.0.0.1:5000/delete_product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.status === 200){
        toast.success("Deleted product successfully",{autoClose:3000,position:"top-center"})
        setDeleteModal(false);
        recall()
      }else{
        toast.error("Error while deleting product",{autoClose:3000,position:"top-center"})
      }
    }else{
      fetch(`http://127.0.0.1:5000/remove_from_wishlist/${localStorage.getItem("id")}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          details:productId
        })
      }).then((response)=>{
        if(response.status === 200){
          toast.success("Product removed from wishlist",{autoClose:3000,position:"top-center"})
          setDeleteModal(false);
          recall()
        }
      }).catch((err)=>{
          toast.error("Error while removing from wishlist product",{autoClose:3000,position:"top-center"})
      })
    }
  }
  const truncateDescription = (description, maxLength) => {
    // Check if the length of the description exceeds the maximum length
    if (description.length > maxLength) {
      // Return the truncated description with ellipsis
      return description.slice(0, maxLength) + "...";
    }
    // Return the original description if it doesn't exceed the maximum length
    return description;
  };
  const naviagte = useNavigate();
  const handleNavigation = () =>{
    naviagte(`/productDetails/${productId}`)
  }
  const seeMoreNavigation = (value) =>{
    naviagte(`/productPage/${value}`)
  }
  const handleBuyNow = () =>{
    handleToast();
    naviagte(`/Mycart/${localStorage.getItem('id')}`)
  }
  return (
    <div className={styles.card}  style={{ height: heightVal ? heightVal : "" }}>
      <div className={styles.img}>
        <img onClick={handleNavigation}
          src={imgUrl != null ? imgUrl : "https://via.placeholder.com/300x300"}
          alt="Product"
        />
      </div>
      <div style={{display:"grid"}}>
        <h3>
          {name}
          <br />
          <p style={{fontSize:"2vh",textAlign:"center"}}>{truncateDescription(description,15)}</p>
        </h3>
        <p className={styles.price}>₹{price}</p>
        {isMapped && (
            <>
        <p className={styles.availability}>
          {isSeller ? `Quanity: ${isMapped ? quantityValue : quantity}` : "In stock"}
        </p>
        <button onClick={handleToast} className={styles.buttonYellow}>{isSeller ? "Boost this Product" : "Move to cart"}</button>
        <div className={styles.actionsWrapper} style={{ display: "flex", justifyContent: "space-evenly" }}>
          {isDelete ? (
            <p onClick={()=>setDeleteModal(true)}>Delete |</p>
          ):(
            <p onClick={handleWishlist}>Wishlist |</p>
          )}
          {isSeller ? (
            <p onClick={() => setQuantityModal(true)}>
            Add more Quantity
          </p>
          ):(
            <p onClick={()=>handleBuyNow()}>
            Buy now |
          </p>
          )}
            
          {!isSeller && <p onClick={()=>seeMoreNavigation(category)}>See more</p>}
        </div>
            </>
        )}
      </div>
      {quantityModal && (
      <Modal
        header={`Update Quanity for ${name}`}
        isOpen={quantityModal}
        size={"small"}
        onClose={() => setQuantityModal(false)}
      >
        <div style={{display:"flex",gap:"2vh",justifyContent:"center",alignItems:"center",height:"50%"}}>
          <div onClick={()=>isMapped ? handleQuantityChangeAdd() : quantityAdd()}>
            <AddOutlinedIcon />
          </div>
          <p>{isMapped ? quantityValue : quantity}</p>
          <div
            onClick={()=>isMapped ? handleQuantityChangeMinus() : quantityMinus()}
          >
            <RemoveOutlinedIcon />
          </div>
        </div>
         <button className={styles.buttonYellow} style={{width:"10vw"}} onClick={handleUpdate}>Update</button>
      </Modal>
      )}
      {deleteModal && (
        <Modal isOpen={deleteModal} size={"small"} onClose={()=>deleteModal(false)} header={`Delete ${name}`}>
          <div style={{display:"grid",height:"60%",alignItems:"center"}}>
            <p style={{textAlign:"center"}}>Are you sure you want to delete this product</p>
            <div style={{display:"flex",justifyContent:"center",gap:"2vw",height:"4vh"}} className="buttons">
              <button style={{backgroundColor:"transparent",border:"1px solid green",width:"10vh",borderRadius:"15px"}} onClick={handleDeleteProduct}>Yes</button>
              <button style={{backgroundColor:"transparent",border:"1px solid red",width:"10vh",borderRadius:"15px"}} onClick={()=>setDeleteModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductCard;
