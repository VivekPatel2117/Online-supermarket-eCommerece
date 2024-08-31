import React from 'react';
import styles from './buyerRegister.module.css'
import buyerImg from "../../../assets/buyer.png"
const BuyerRegister = () => {
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
              <input type="text" required />
              <label>Full name</label>
            </div>
            <div className={styles.inputField}>
              <input type="number" required />
              <label>Phone number</label>
            </div>
            <div className={styles.inputField}>
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className={styles.inputField}>
              <input type="password" required />
              <label>Password</label>
            </div>
            <button className={styles.resgiterButton} type="submit">Register</button>
            <div className={styles.register}>
              <p>
                Already a customer? <a href="/Login/login.html">Login</a>
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
