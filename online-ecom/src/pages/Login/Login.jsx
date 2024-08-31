import React from "react";
import styles from "./login.module.css";
import gLogo from "../../assets/gLogo.png";
export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.formDiv}>
          <div className={styles.headers}>
            <p>Hello User! Welcome back</p>
          </div>
          <div className={styles.formInputs}>
            <div className={styles.inputDiv}>
              <input type="text" name="username" id="username" required />
              <label htmlFor="username">Username / Email</label>
            </div>
            <div className={styles.inputDiv}>
              <input type="password" name="password" id="password" required />
              <span class="material-symbols-outlined">visibility</span>
              <label htmlFor="password">Password</label>
            </div>
            <div className={styles.loginBtn}>
              <button>Login</button>
            </div>
            <h4 style={{ padding: "1vh" }}>Already a user?</h4>
            <div className={styles.formDivider}>
              <h3>OR Login with</h3>
            </div>
            <div className={styles.oauthDiv}>
              <img src={gLogo} height={"50"} width={"50"} alt="google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
