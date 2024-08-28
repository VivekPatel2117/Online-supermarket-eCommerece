import React, { useState, useEffect } from 'react';
import styles from './slide.module.css';

const Slide = (image) => {
  const [currentIndex, setCurrentIndex] = useState(0);
 const [images, setImages] = useState(image.images)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  const updateCarousel = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselInner}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.carouselItem}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className={`${styles.carouselControl} ${styles.prev}`} onClick={() => updateCarousel((currentIndex - 1 + images.length) % images.length)}>
        ‹
      </button>
      <button className={`${styles.carouselControl} ${styles.next}`} onClick={() => updateCarousel((currentIndex + 1) % images.length)}>
        ›
      </button>
    </div>
  );
};

export default Slide;
