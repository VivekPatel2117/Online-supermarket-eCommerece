import React, { useState, useEffect } from "react";
import styles from "./SellerHome.module.css";
import { toast } from "react-toastify";
import SellerNavbar from "../../components/SellerNavbar/SellerNavbar";
import ProductCard from "../../components/NewProductCart/ProductCard";
import Modal from "../../components/Modal/Modal";
import Footer from "../../components/Footer/Footer"
export default function SellerHome() {
  const [productsData, setProductsData] = useState([])
  const [activeTab, setActiveTab] = useState("dashboard");
  useEffect(() => {
   getAllProducts();  
  }, [activeTab])
    const recall = () =>{
      console.log("called");
      getAllProducts();
    }
  const getAllProducts = () =>{
    if(localStorage.getItem("access") != "seller"){
      toast.error("User is not a seller please login with seller account",{autoClose:3000,position:"top-center"})
    }
    const user_id = localStorage.getItem("id");
     fetch(`http://127.0.0.1:5000/get_products/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }) .then(res => res.json())
    .then(data => {
      setProductsData(data.data)
      console.log(data.data); // Correctly logs the parsed JSON response
    })
    .catch((err)=>console.log(err))
  
  }
  const handleActiveTab = (value) => {
    setActiveTab(value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [category, setCategory] = useState("");
  const handleImageChange = (e) => {
    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setProductImage(e.target.files[0]);
  };
  const handleQuantityChangeAdd = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  const handleQuantityChangeMinus = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("id");
    const access = localStorage.getItem("access");
    if(access != "seller") return;
     const data = new FormData();
     data.append("file", productImage);
     data.append("upload_preset", "freshmart");
     data.append("cloud_name", "Pillai-ig");
     toast.warn("Please wait while we are adding a new product",{autoClose:3000,position:"top-center"});
     setIsLoading(true)
     const response = await fetch(
       "https://api.cloudinary.com/v1_1/Pillai-ig/image/upload",
       {
         method: "post",
         body: data,
       }
     );
     if(response.status === 200 ){
       setIsLoading(false);
     const Resurl = await response.json();
    const res = await fetch("http://127.0.0.1:5000/add_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id":user_id,
        "imgUrl": Resurl.url,
        productName,
        description,
        "quantity":quantity,
        "price":price,
        category,
      }),
    });
    if(res.status === 200){
      setIsLoading(false);
      setModalOpen(false);
      setProductImage(null);
      setCategory("");
      setProductName("");
      setPrice("")
      setImgUrl(null)
      setDescription("")
      setQuantity(0);
      getAllProducts()
    }
  }
    else{
      toast.error("Internal Error occured",{autoClose:3000,position:"top-center"});
      setIsLoading(false);
    }
  };
  const [pendingOrders, setPendingOrders] = useState([])
  const handleOrdersData = () => {
    fetch(`http://127.0.0.1:5000/get_order_details_seller/${localStorage.getItem('id')}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPendingOrders(data.data)
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        toast.error("Failed to fetch order details. Please try again later.",{autoClose:3000,position:"top-center"});
      });
  };
  
  useEffect(() => {
handleOrdersData()
  }, [])
  const [userDetailsModal, setUserDetailsModal] = useState(false)
  const [userData, setUserData] = useState([]);

  const handleDeliveryDetails = (order) => {
    setUserDetailsModal(true);
    
    fetch(`http://127.0.0.1:5000/user_detail/${order.ordered_by_user_id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      const userInfo = data.data;
      const formattedUserData = {
        username: userInfo.username,
        address: userInfo.address,
        phone: userInfo.phone,
        email: userInfo.email,
      };
      setUserData(formattedUserData);
      console.log(formattedUserData);
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
  };
  
 const handleMarkAsCompleted  = (item) =>{

 }
//  const handleDeliveryDetails = async(item) =>{
//   setUserDetailsModal(true);
//   setSpinner(true)
//   const user_data = await getUserDetails(item.ordered_by_user_id);
//   if(user_data){
//     setUserData(userData)
//   }
//   setSpinner(false)
//  }
 const tableStyle = {
  borderCollapse: "collapse",
  width: "50%",
  margin: "20px auto"
};

const thTdStyle = {
  border: "1px solid black",
  padding: "8px",
  textAlign: "left"
};

const thStyle = {
  backgroundColor: "#f2f2f2"
};
const [subActiveTab, setSubActiveTab] = useState('pending');
const handleSubActiveTab = (value) =>{
  setSubActiveTab(value)
}
  return (
    <>
      <SellerNavbar />
      <div className={styles.SellerHomeWrapper}>
        <div className={styles.SellerHomeHeaders}>
          <p
            onClick={() => handleActiveTab("dashboard")}
            className={`${styles.sectionHeaders} ${
              activeTab === "dashboard" ? styles.SellerHomeHeadersActive : ""
            }`}
          >
            Dashboard
          </p>
          <p
            onClick={() => handleActiveTab("inventory")}
            className={`${styles.sectionHeaders} ${
              activeTab === "inventory" ? styles.SellerHomeHeadersActive : ""
            }`}
          >
            Inventory
          </p>
        </div>
        {activeTab === "dashboard" ? (
          <div className={styles.dashboardWrapper}>
            {/* <div className={styles.storePreview}>
              <div className={styles.RecentCustomer}>
                <p style={{ fontSize: "3.5vh", color: "gray" }}>
                  Recent Customers
                </p>
                <div className={styles.userBoxWrapper}>
                  <div className={styles.userBox}>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                    <p>Username</p>
                    <p>amt</p>
                  </div>
                  <div className={styles.userBox}>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                    <p>Username</p>
                    <p>amt</p>
                  </div>
                  <div className={styles.userBox}>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                    <p>Username</p>
                    <p>amt</p>
                  </div>
                  <div className={styles.userBox}>
                    <img src="https://via.placeholder.com/50x50" alt="" />
                    <p>Username</p>
                    <p>amt</p>
                  </div>
                </div>
              </div>
              <div className={styles.WeeklyOrders}>
                <p style={{ fontSize: "3.5vh", color: "gray" }}>
                  Weekly orders
                </p>
                <p>Number of orders</p>
                <h1>Amout</h1>
              </div>
              <div className={styles.Overview}>
                <p style={{ fontSize: "3.5vh", color: "gray" }}>
                  Store overview
                </p>
                <p>Number of products</p>
                <p>Most sold</p>
              </div>
            </div> */}
            <div style={{display:'flex',gap:'3vw',height:'5vh'}}>
              <p onClick={()=>handleSubActiveTab('pending')} className={ subActiveTab === 'pending' && styles.SellerHomeHeadersActive}>Pending orders</p>
              <p onClick={()=>handleSubActiveTab('delivered')} className={ subActiveTab === 'delivered' && styles.SellerHomeHeadersActive}>Completed orders</p>
            </div>
            {subActiveTab === 'pending' ? (
              <>
            {pendingOrders.length > 0 ? (
              <>
              {pendingOrders.map((item)=>(
                   <div className={styles.cartItems}>
                   {/* Mapping function */}
                   <div className={styles.productImg}>
                     <img src={item.imgUrl} alt="freshmart" />
                   </div>
                   <div className={styles.description}>
                     <div className={styles.descHead}>
                       <h4>{item.productName}</h4>
                       <p>Quantity: {item.order_quantity}</p>
                     </div>
                     <div className={styles.descPrice}>
                       <p>₹ {item.order_amount}</p>
                     </div>
                     <div className={styles.actions}>
                       <div className={styles.updateQuantity}>
                         <p onClick={()=>handleMarkAsCompleted(item)}> Mark as completed</p>
                       </div>
                       <div className={styles.removeItem}>
                         <p onClick={()=>handleDeliveryDetails(item)}>See delivery address</p>
                       </div>
                     </div>
                   </div>
                 </div>
              ))}
              </>
            ):(
              <p>No pending orders</p>
            )}
              </>
            ):(
              <p>No past delivered orders</p>
            )}
           
          </div>
        ) : (
          <div className={styles.InventoryWrapper}>
            <h1 style={{ display: "flex", alignItems: "center", gap: "2vh" }}>
              Your Product list -{" "}
              <p onClick={() => setModalOpen(!modalOpen)}> Add more products</p>
            </h1>
            <div className={styles.InventoryWrapperCards}>
              {productsData.length > 0 ? (
                <>
                {productsData.map((data)=>(
                  <ProductCard isMapped={true} recall={recall} productId={data._id} quantityAdd={handleQuantityChangeAdd} quantityMinus={handleQuantityChangeMinus} isSeller={true} key={data._id} description={data.description} imgUrl={data.imgUrl} name={data.productName} quantity={data.quantity} price={data.price}/>
                ))}
                </>
              ):(
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal
        header={"Add your product"}
        size={"xlarge"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
      >
        {isLoading ? (
        <div style={{ placeSelf: "center",display:"flex", justifyContent:"center",alignItems:"center", height:"75vh" }}>
        <div
          className="spinner"
          style={{
            width: "15vh",
            border: "4px solid #624FC2",
            borderRightColor: "white",
          }}
        />
      </div>
      ):(
        <div className={styles.modalDivWrapper}>
          <ProductCard
            quantityAdd={handleQuantityChangeAdd}
            quantityMinus={handleQuantityChangeMinus}
            isSeller={true}
            imgUrl={imgUrl}
            quantity={quantity}
            isMapped={false}
            name={productName}
            description={description}
            price={price}
            
          />
          <div className="form">
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <h2 className={styles.formHeading}>Add New Product</h2>

              <div className={styles.inputGroup}>
                <label htmlFor="image" className={styles.label}>Product Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="product-name" className={styles.label}>Product Name:</label>
                <input
                  type="text"
                  name="product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description" className={styles.label}>Description:</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textareaField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="quantity" className={styles.label}>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="price" className={styles.label}>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="category" className={styles.label}>Category:</label>
                <select 
                style={{width:"100%",padding:"8px",border:"none",outline:"none"}}
                    className={styles.inputField} 
                    value={category} 
                    required
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Chips">Chips</option>
                    <option value="drinks">Drinks</option>
                </select>
              </div>
              <button type="submit" className={styles.submitButton}>
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
      </Modal>
      <Modal isOpen={userDetailsModal} header={"User details for delivery"} onClose={()=>setUserDetailsModal(false)}>
      {userData.username ? (
      <table style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...thTdStyle, ...thStyle }}>Field</th>
          <th style={{ ...thTdStyle, ...thStyle }}>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={thTdStyle}>Username</td>
          <td style={thTdStyle}>{userData.username}</td>
        </tr>
        <tr>
          <td style={thTdStyle}>Address</td>
          <td style={thTdStyle}>{userData.address}</td>
        </tr>
        <tr>
          <td style={thTdStyle}>Phone</td>
          <td style={thTdStyle}>{userData.phone}</td>
        </tr>
        <tr>
          <td style={thTdStyle}>Email</td>
          <td style={thTdStyle}>{userData.email}</td>
        </tr>
      </tbody>
      </table>
      ):(
        <div style={{ placeSelf: "center",display:"flex", justifyContent:"center",alignItems:"center", height:"auto" }}>
        <div
          className="spinner"
          style={{
            width: "15vh",
            border: "4px solid #624FC2",
            borderRightColor: "white",
          }}
        />
      </div>
      )}
      </Modal>
      <Footer/>
    </>

  );
}
