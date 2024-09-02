import React, { useState } from 'react';
import styles from './sellerRegister.module.css';
import SellerRegisterImg from "../../../assets/seller2.png";
import {Link} from "react-router-dom"
const SellerRegister = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/sellerRegister`,{
            method:"POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                  body:JSON.stringify({
                      username:fullName,phone:phoneNumber,email,password,access:"seller"})
                  })
        if(response.status === 200){
            naviagte("/Home")
          }else if(response.status == 409){
            console.log(response)
            naviagte("/Login")
          }
          else{
            toast.error("Internal error occured",{autoClose:3000,position:"top-center"})
          }
        console.log({ fullName, phoneNumber, email, password });
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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
