import React, { useState } from 'react';
import styles from './sellerRegister.module.css';
import SellerRegisterImg from "../../../assets/seller2.png";
const SellerRegister = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here
        console.log({ fullName, phoneNumber, email, password });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <h2>Register now for free</h2>
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
                    <button type="submit">Register</button>
                    <div className={styles.register}>
                        <p>Already a user? <a href="/Login/login.html">Login</a></p>
                    </div>
                </form>
            </div>
            <div className={styles.imgWrapper}>
                <img src={SellerRegisterImg} alt="seller" />
            </div>
        </div>
    );
};

export default SellerRegister;
