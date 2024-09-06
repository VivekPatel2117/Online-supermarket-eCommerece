import React, { useState, useEffect } from "react";
import styles from "../Navbar/Navbar.module.css";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
export default function SellerNavbar() {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.logoDiv}>
        <Link to={"/Home"}>
        <img src={Logo} style={{margin:"1vh"}} height={50} width={50} alt="logo" />
        </Link>
        <p style={{fontSize:"4vh",marginBottom:"4px"}}>Freshmart Seller</p>
      </div>
      <div className={styles.inputDiv}>
      </div>
      <div className={styles.iconsWrapper}>
        <div className={styles.icons}>
          <p><ReceiptLongIcon fontSize={"large"}/></p>
            <Link to={`/profileSection/${localStorage.getItem("id")}`}>
          <p>
            <PersonOutlineIcon fontSize="large" />
            </p>
            </Link>
        </div>
      </div>
    </div>
  );
}
