import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import styles from "./login.module.css";
import gLogo from "../../assets/gLogo.png";
import LoginImg from "../../assets/login.png";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios"
export default function Login() {
  const navigate = useNavigate();
  const [isEyeToggle, setIsEyeToggle] = useState(false);
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async() => {
    const response = await axios.post("http://127.0.0.1:5000/login",{username:userName,password});
    if(response.status === 200){
      navigate("/Home")
    }
  }
  const handleEyeToggle = () => {
    setIsEyeToggle(!isEyeToggle)
  }
  return (
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
              <button onClick={handleSubmit}>Login</button>
            </div>
            <h4 className={styles.alreadyUserH4} style={{ padding: "1vh" }}>
              <Link style={{textDecoration:"none"}} to={"/buyer"}><p style={{textDecoration:"none",color:"gray"}}>Already a user?</p></Link>
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
    <ToastContainer/>
    </div>
  );
}
