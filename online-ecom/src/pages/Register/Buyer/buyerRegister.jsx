import React,{useState} from 'react';
import styles from './buyerRegister.module.css'
import buyerImg from "../../../assets/buyer.png"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const BuyerRegister = () => {
  const naviagte = useNavigate();
  const [isEyeToogle, setIsEyeToogle] = useState(false)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("");

const handleRegister = (e) => {
    e.preventDefault();

    fetch(`http://127.0.0.1:5000/buyerRegister`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            phone,
            access: "user"
        })
    })
    .then(response => {
        console.log(response.status);
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 409) {
            toast.warn("User already exists", { autoClose: 3000, position: "top-center" });
            navigate("/");
            return Promise.reject('User already exists');
        } else {
            toast.error("Internal error occurred", { autoClose: 3000, position: "top-center" });
            return Promise.reject('Internal error occurred');
        }
    })
    .then(data => {
        localStorage.setItem("id", data.id);
        localStorage.setItem("access", "user");
        navigate("/Home");
    })
    .catch(error => {
        // Handle unexpected errors or rejection from the previous .then()
        console.error('Error:', error);
        toast.error("An unexpected error occurred", { autoClose: 3000, position: "top-center" });
    });
};

  return (
    <div className={styles.wrapperBody}>
      <div className={styles.parentWrapper}>
      <div className={styles.head}>
        <h1>Get Grocery at your door step</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form action="#">
            <h2>Register now</h2>
            <div className={styles.inputField}>
              <input type="text" onChange={(e)=>setUsername(e.target.value)} required />
              <label>Full name</label>
            </div>
            <div className={styles.inputField}>
              <input type="number" onChange={(e)=>setPhone(e.target.value)} required />
              <label>Phone number</label>
            </div>
            <div className={styles.inputField}>
              <input type="email" onChange={(e)=>setEmail(e.target.value)} required />
              <label>Email</label>
            </div>
            <div className={styles.inputField}>
              <input type={isEyeToogle ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} required />
              <label>Password</label>
              <div className={styles.isEyeToggle} onClick={()=>setIsEyeToogle(!isEyeToogle)}>
              {isEyeToogle ? (
                <Visibility/>
              ):(
                <VisibilityOff/>
              )}
              </div>
            </div>
            <button className={styles.resgiterButton} onClick={handleRegister}>Register</button>
            <div className={styles.register}>
              <p className={styles.alreadyUserH4}>
                Already a customer? <Link to={"/"}>Login</Link>
              </p>
            </div>
          </form>
        </div>
        <div className={styles.img}>
          <img src={buyerImg} alt="buyer" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default BuyerRegister;
