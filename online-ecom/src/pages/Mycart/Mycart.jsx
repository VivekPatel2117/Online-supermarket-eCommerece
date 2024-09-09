import React, { useEffect, useState } from "react";
import styles from "./Mycart.module.css";
import Navbar from "../../components/Navbar/Navbar";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../../components/Modal/Modal";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addToCart,
  removeFromCart,
  removeProductFromCart,
} from "../../stores/cart";
export default function Mycart() {
  const carts = useSelector((store) => store.cart.item);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [productsTotal, setproductsTotal] = useState(0.0);
  const [uniqueRecommendations, setUniqueRecommendations] = useState([]);
  const [pQuantity, setPQuantity] = useState(0);
  const products = useSelector((store) => store.cart.item);
  const navigate = useNavigate();
  const { user_id } = useParams();
  const [confirmModal, setConfirmModal] = useState(false)
  const remove = (id) => {
    const index = products.findIndex((item) => item.productId == id);
    setPQuantity(products[index].quantity);
    dispatch(
      removeFromCart({
        productId: id,
        quantity: 1,
      })
    );
    if (pQuantity === 0) {
      return;
    }
  };
  const add = (id, price) => {
    const index = products.findIndex((item) => item.productId == id);
    setPQuantity(products[index].quantity);
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
        price: price,
      })
    );
  };
  const removeItem = (index) => {
    console.log("Before removal:", productDetails); // Log state before removal
    const newItems = productDetails.filter((_, i) => i !== index);
    console.log("After removal:", newItems); // Log new state after removal
    setProductDetails(newItems);
    console.log(products);
  };
  const deleteFromCart = (id) => {
    const index = products.findIndex((item) => item.productId == id);
    dispatch(
      removeProductFromCart({
        productId: id,
      })
    );
    if (index >= 0) {
      console.log(index);
      removeItem(index);
    }
  };
  // Fetch product details and recommended products
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailsPromises = products.map(async (item) => {
          const response = await fetch(
            `http://127.0.0.1:5000/get_product_details/${item.productId}`
          );
          const data = await response.json();
          return { ...data.data, addedQuantity: item.quantity };
        });

        const details = await Promise.all(detailsPromises);
        setProductDetails(details);

        const category = [...new Set(details.map((item) => item.category))];
        const recommendedResponse = await fetch(
          `http://127.0.0.1:5000/get_recommended/${user_id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category }),
          }
        );
        const recommendedData = await recommendedResponse.json();

        // Filter out products already in productDetails
        const filteredRecommendations =
          recommendedData.category || recommendedData.wishlist || [];
        const productIdsInCart = new Set(
          productDetails.map((item) => item._id)
        );

        const uniqueRecommendations = filteredRecommendations.filter(
          (product) => !productIdsInCart.has(product._id)
        );
        setRecommended(uniqueRecommendations);
      } catch (error) {
        toast.error("Error while loading", {
          autoClose: 3000,
          position: "top-center",
        });
      }
    };

    fetchProductDetails();
  }, [products, user_id]);

  // Filter unique recommendations
  useEffect(() => {
    if (recommended.length > 0) {
      setUniqueRecommendations(
        recommended.filter(
          (product, index, self) =>
            index === self.findIndex((p) => p._id === product._id)
        )
      );
    }
  }, [recommended]);

  useEffect(() => {
    let sum = 0;
    if (products.length > 0) {
      products.map((item) => {
        sum = sum + item.price * item.quantity;
      });
      setproductsTotal(sum);
    }
    setproductsTotal(sum);
  }, [products]);

  const handleNavigation = (id) => navigate(`/productDetails/${id}`);

  const handleCart = (id, price) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
        price: price,
      })
    );
    console.log(products);
  };
  const handleWishlist = (id) => {
    fetch(
      `http://127.0.0.1:5000/add_to_wishlist/${localStorage.getItem("id")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          details: id,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Product added to wishlist", {
            autoClose: 3000,
            position: "top-right",
          });
        }
      })
      .catch((err) => {
        toast.error("Error while adding to wishlist", {
          autoClose: 3000,
          position: "top-right",
        });
      });
  };
  const handleBuyNow = (amount) =>{
    console.log("Clicker")
    fetch(`http://127.0.0.1:5000/user_detail/${localStorage.getItem("id")}`,{
      method:"GET",
    headers:{
      "Content-type":"application/json"
    }
  }).then((res)=>res.json())
  .then((data)=>{
    if(data.data){
      const userData = data.data;
      setConfirmModal(true)
      if(userData.address){
        setConfirmModal(true)
      }else{
        setConfirmModal(true)
        toast.success(`Please update the address from profile section. \n Click here to update address`,{autoClose:5000,position:"top-center"})
      }
    }
  })
  }
  const handlePayment = (amt) =>{
    navigate(`/payment/${amt}`)
  }
  return (
    <div style={{ backgroundColor: "rgb(246 241 241)" }}>
      <Navbar />
      <div className={styles.MycartWrapper}>
        <div className={styles.headings}>
          <h1>Shopping Cart</h1>
        </div>
        <div className={styles.structure}>
          <div className={styles.carts}>
            {productDetails.length > 0 ? (
              productDetails.map((item, index) => (
                <div className={styles.cartItems} key={item._id}>
                  <div className={styles.productImg}>
                    <img
                      onClick={() => handleNavigation(item._id)}
                      src={item.imgUrl}
                      alt="product"
                    />
                  </div>
                  <div className={styles.description}>
                    <div className={styles.descHead}>
                      <h4>{item.productName}</h4>
                    </div>
                    <div className={styles.descPrice}>
                      <p>
                        <CurrencyRupee />
                        {item.price * item.addedQuantity}
                      </p>
                    </div>
                    <div className={styles.actions}>
                      <div className={styles.updateQuantity}>
                        <button onClick={() => add(item._id, item.price)}>
                          <AddIcon />
                        </button>
                        <p>
                          {products[index]
                            ? products[index].quantity
                            : deleteFromCart(item._id)}
                        </p>
                        <button onClick={() => remove(item._id)}>
                          <RemoveIcon />
                        </button>
                      </div>
                      <div className={styles.removeItem}>
                        <p onClick={() => deleteFromCart(item._id)}>Delete</p>
                      </div>
                      <div className={styles.wishlistItem}>
                        <p onClick={() => handleWishlist(item._id)}>Wishlist</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <p className={styles.emptyCartMessage}>Cart is empty</p>
            )}
          </div>
          <div className={styles.recommended}>
            <div className={styles.subTotal}>
              <div className={styles.subtotalAmt}>
                <p>Subtotal Items ({productDetails.length}): </p>
                <CurrencyRupee />
                <span>{productsTotal}</span>
              </div>
              <div className={styles.proceedToBuyBTtn}>
                <button onClick={()=>handlePayment(productsTotal)}>Proceed to Buy</button>
              </div>
            </div>
            <div className={styles.pairUpItems}>
              <h1 style={{ marginTop: "2vh" }}>Pair with your cart</h1>
              {uniqueRecommendations.length > 0 ? (
                uniqueRecommendations.map((product) => (
                  <div className={styles.itemsBox} key={product._id}>
                    <div className={styles.imgBox}>
                      <img
                        onClick={() => handleNavigation(product._id)}
                        src={product.imgUrl}
                        alt={product.productName}
                      />
                    </div>
                    <div className={styles.itemsBoxDesc}>
                      <h4>{product.productName}</h4>
                      <p>
                        <CurrencyRupee />
                        {product.price}
                      </p>
                      <div className={styles.addCart}>
                        <button
                          onClick={() => handleCart(product._id, product.price)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recommended products</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal>
        <Modal
          isOpen={confirmModal}
          size={"small"}
          onClose={() => confirmModal(false)}
          header={`Confirm payment`}
        >
          <div style={{ display: "grid", height: "60%", alignItems: "center" }}>
            <p style={{ textAlign: "center" }}>
              Confirm this payment
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "2vw",
                height: "4vh",
              }}
              className="buttons"
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid green",
                  width: "10vh",
                  borderRadius: "15px",
                }}
                onClick={()=>handlePayment(productsTotal)}
              >
                Yes
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid red",
                  width: "10vh",
                  borderRadius: "15px",
                }}
                onClick={() => setConfirmModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </Modal>
    </div>
  );
}
