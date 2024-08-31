import React, { useState, useEffect } from 'react';
import styles from "./Slider.module.css";

export default function Slider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderImg}>
        {images.map((img, index) => (
          <img
            className={`${styles.ImageTag} ${index === currentIndex ? styles.active : ''}`}
            src={img}
            key={index}
            alt='image'
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          />
        ))}
      </div>
    </div>
  );
}
