import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export default function Navbar() {
  const searchLabels = ["Apples", "Milk", "Butter"];
  const [currentLabel, setCurrentLabel] = useState(searchLabels[0]);
  const [animate, setAnimate] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleInput = (value) =>{
    const labelTag = document.getElementById("searchLabel")
    if(labelTag && value.target.value !=""){
      labelTag.style.visibility = "hidden"
    }else{
      labelTag.style.visibility = "visible"
    }
    setSearchValue(value.target.value)
  }
  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentLabel((prevLabel) => {
          const currentIndex = searchLabels.indexOf(prevLabel);
          const nextIndex = (currentIndex + 1) % searchLabels.length;
          return searchLabels[nextIndex];
        });
    },2500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [searchLabels]);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.logoDiv}>Image here</div>
      <div className={styles.inputDiv}>
        <div className={styles.searchDiv}>
          <input onChange={handleInput} value={searchValue} style={{paddingLeft:"5vh"}} type="search" name="searchbox" id="searchbox" />
          <label style={{display:"flex"}} htmlFor="searchbox">
            <SearchRoundedIcon/>
            <span
              className={styles.label}
              id="searchLabel"
            >
              Search "{currentLabel}"
            </span>
            
          </label>
        </div>
      </div>
      <div className={styles.iconsWrapper}>
        <div className={styles.icons}>
          <p><ShoppingCartOutlinedIcon fontSize={"large"}/></p>
          <p><FavoriteBorderIcon fontSize="large"/></p>
          <p><PersonOutlineIcon fontSize="large" /></p>
        </div>
      </div>
    </div>
  );
}
