import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import Modal from "../Modal/Modal";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { toast } from "react-toastify";
const ProductCard = ({
  isSeller,
  imgUrl,
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
  const handleDeleteProduct = async () =>{
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
  }
  return (
    <div className={styles.card} style={{ height: heightVal ? heightVal : "" }}>
      <div className={styles.img}>
        <img
          src={imgUrl != null ? imgUrl : "https://via.placeholder.com/300x300"}
          alt="Product"
        />
      </div>
      <div style={{display:"grid"}}>
        <h3>
          {name}
          <br />
          <p>{description}</p>
        </h3>
        <p className={styles.price}>₹{price}</p>
        {isMapped && (
            <>
        <p className={styles.availability}>
          {isSeller ? `Quanity: ${isMapped ? quantityValue : quantity}` : "In stock"}
        </p>
        <button className={styles.buttonYellow}>{isSeller ? "Boost this Product" : "Move to cart"}</button>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <p onClick={()=>setDeleteModal(true)}>Delete</p>
          {isSeller ? (
            <p onClick={() => setQuantityModal(true)}>
            Add more Quantity
          </p>
          ):(
            <p>
            Add to list
          </p>
          )}
            
          {!isSeller && <p>See more like this</p>}
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
