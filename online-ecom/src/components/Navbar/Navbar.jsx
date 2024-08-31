import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const searchLabels = ["Apples", "Milk", "Butter"];
  const [currentLabel, setCurrentLabel] = useState(searchLabels[0]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // Trigger the animation
      setTimeout(() => {
        setCurrentLabel((prevLabel) => {
          const currentIndex = searchLabels.indexOf(prevLabel);
          const nextIndex = (currentIndex + 1) % searchLabels.length;
          return searchLabels[nextIndex];
        });
        setAnimate(false); // Reset the animation
      }, 3500); // This timeout should match the animation duration
    }, 1000); // Change label every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [searchLabels]);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.logoDiv}>Image here</div>
      <div className={styles.inputDiv}>
        <div className={styles.searchDiv}>
          <input type="search" name="searchbox" id="searchbox" />
          <label style={{display:"flex"}} htmlFor="searchbox">
            <p>search<span
              className={`${styles.label} ${animate ? styles.slideIn : ""}`}
            >
              "{currentLabel}"
            </span>
            </p>
          </label>
        </div>
        <div className={styles.searchIcon}>icon</div>
      </div>
      <div>
        <div className={styles.icons}>
          <p>cart</p>
          <p>wishlist</p>
          <p>profile</p>
        </div>
      </div>
    </div>
  );
}
