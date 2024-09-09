import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "./login.module.css";
import gLogo from "../../assets/gLogo.png";
import LoginImg from "../../assets/login.png";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Alert } from "@mui/material";
export default function Login() {
  const navigate = useNavigate();
  const [isEyeToggle, setIsEyeToggle] = useState(false);
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);

const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: userName,
            password,
        })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            toast.error("Wrong credentials", { autoClose: 3000, position: "top-center" });
            return Promise.reject('Wrong credentials');
        }
    })
    .then(data => {
        console.log(data);
        const access = data.access;
        const id = data.id;
        localStorage.setItem("access", access);
        localStorage.setItem("id", id);
        if (access === "seller") {
            navigate("/SellerHome");
        } else {
            navigate("/Home");
        }
    })
    .catch(error => {
        // Handle errors that occur during fetch or from rejected promises
        console.error('Error:', error);
        toast.error("An unexpected error occurred", { autoClose: 3000, position: "top-center" });
    });
};


  const handleEyeToggle = () => {
    setIsEyeToggle(!isEyeToggle)
  }
  return (
    <>{isAlert && (
     <Alert severity="warning" onClose={() => {setIsAlert(false)}}>
       Error
      </Alert>
    )}
    <div className={styles.loginWrapper}>
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.formDiv}>
          <div className={styles.headers}>
            <p>Hello User! Welcome back</p>
          </div>
          <div className={styles.formInputs}>
            <div className={styles.inputDiv}>
              <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}  name="username" id="username" required />
              <label htmlFor="username">Username / Email</label>
            </div>
            <div className={styles.inputDiv}>
              <input type={isEyeToggle ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} value={password} name="password" id="password" required />
              <div onClick={handleEyeToggle} className={styles.eyeToggle}>
              {isEyeToggle ? (
                <VisibilityIcon/>
              ):(
                <VisibilityOffIcon/>
              )}
              </div>
              <label htmlFor="password">Password</label>
            </div>
            <div className={styles.loginBtn}>
              <button type="submit" onClick={handleSubmit}>Login</button>
            </div>
            <h4 className={styles.alreadyUserH4} style={{ padding: "1vh" }}>
              <p style={{textDecoration:"none",color:"gray"}}>Don't have an account? <Link style={{textDecoration:"none"}} to={"/buyer"}>Sign up now</Link></p>
              </h4>
            <div className={styles.formDivider}>
              <h3>OR Login with</h3>
            </div>
            <div className={styles.oauthDiv}>
              <img src={gLogo} height={"50"} width={"50"} alt="google" />
            </div>
          </div>
        </div>
      </div>
      <div className="RightImg">
        <img src={LoginImg} alt="login" />
      </div>
    </div>
    </div>
    </>
  );
}
