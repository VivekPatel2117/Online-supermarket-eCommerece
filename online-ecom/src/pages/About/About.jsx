import styles from './About.module.css';

const About = () => {
  return (
    <section className={styles.freshmartSection}>
    <div className={styles.freshmartContainer}>
      <div className={styles.freshmartRow}>
        <div className={`${styles.contentColumn} ${styles.colLg6} ${styles.colMd12} ${styles.colSm12} ${styles.order2}`}>
          <div className={styles.innerColumn}>
            <div className={styles.secTitle}>
              <span className={styles.title}>About Freshmart</span>
              <h2 className={styles.heading}>Your New Online Grocery Marketplace</h2>
            </div>
            <div className={styles.text}>
              Freshmart was launched just last week with the aim of providing you with fresh and high-quality groceries. 
              Although we are new, we are committed to ensuring that your grocery shopping experience is both smooth and convenient.
            </div>
            <div className={styles.text}>
              From fresh produce to pantry staples, Freshmart brings everything to your doorstep with just a few clicks. Secure payments and timely deliveries are at the heart of our service, ensuring you get your groceries hassle-free.
            </div>
            <div className={styles.btnBox}>
              <a href="/" className={styles.themeBtn}>Shop Now</a>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className={`${styles.imageColumn} ${styles.colLg6} ${styles.colMd12} ${styles.colSm12}`}>
          <div className={styles.innerColumnImage}>
            <div className={styles.authorDesc}>
              <h2>Samruddhi Surve</h2>
              <span>Founder & CEO</span>
            </div>
            <figure className={styles.image}>
              <a href="/">
                <img title="Freshmart Founder" src="https://i.ibb.co/QP6Nmpf/image-1-about.jpg" alt="Freshmart CEO" />
              </a>
            </figure>
          </div>
        </div>
      </div>
      <div className={styles.secTitle}>
        <span className={styles.title}>Our Future Goal</span>
        <h2 className={styles.heading}>Leading the Future of Online Grocery</h2>
      </div>
      <div className={styles.text}>
        Though we’ve just begun, our goal is to lead innovation in the online grocery space, delivering fresh and affordable groceries right to your doorstep.
      </div>
      <div className={styles.text}>
        We're excited to grow with you and bring you the best grocery shopping experience. Stay tuned for new features, exciting offers, and more.
      </div>
      <div className={styles.text}>
        Thank you for being part of Freshmart's journey from the very start!
      </div>
    </div>
  </section>
  );
}

export default About;
