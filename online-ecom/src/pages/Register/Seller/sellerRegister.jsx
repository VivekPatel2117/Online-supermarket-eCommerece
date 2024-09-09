import React, { useState } from 'react';
import styles from './sellerRegister.module.css';
import SellerRegisterImg from "../../../assets/seller2.png";
import { toast } from 'react-toastify';
import {Link,useNavigate} from "react-router-dom"
const SellerRegister = () => {
    const [userName, setuserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const validateuserName = (name) => /^[^\s]+$/.test(name);

    const validatePassword = (password) => 
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!validateuserName(userName)) {
            toast.error("Full name should not contain spaces", { autoClose: 3000, position: "top-center" });
            return;
        }
    
        if (!validatePassword(password)) {
            toast.error("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character", { autoClose: 3000, position: "top-center" });
            return;
        }
    
        fetch(`http://127.0.0.1:5000/sellerRegister`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                phone: phoneNumber,
                email: email,
                password: password,
                access: "seller"
            })
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 409) {
                toast.error("User already exists", { autoClose: 3000, position: "top-center" });
                navigate("/");
                return Promise.reject('User already exists');
            } else {
                toast.error("Internal error occurred", { autoClose: 3000, position: "top-center" });
                return Promise.reject('Internal error occurred');
            }
        })
        .then(data => {
            localStorage.setItem("id", data.id);
            localStorage.setItem("access", "seller");
            navigate("/SellerHome");
        })
        .catch(error => {
            // Handle unexpected errors or rejection from the previous .then()
            console.error('Error:', error);
            toast.error("An unexpected error occurred", { autoClose: 3000, position: "top-center" });
        });
    
    };

    return (
        <div className={styles.wrapperContainer}>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{color:"black"}}>Register now as a Seller</h2>
                    <div className={styles.inputField}>
                        <input
                            type="text"
                            required
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                        <label>Full name</label>
                    </div>
                    <div className={styles.inputField}>
                        <input
                            type="number"
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label>Phone number</label>
                    </div>
                    <div className={styles.inputField}>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className={styles.inputField}>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>
                    <button className={styles.resgiterButton} type="submit">Register</button>
                    <div className={styles.register}>
                        <p>Already a user? <Link to={"/"}>Login</Link></p>
                    </div>
                </form>
            </div>
            <div className={styles.imgWrapper}>
                <img src={SellerRegisterImg} alt="seller" />
            </div>
        </div>
        </div>
    );
};

export default SellerRegister;
