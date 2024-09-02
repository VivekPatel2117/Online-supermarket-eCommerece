import React from 'react';
import styles from './Footer.module.css'; // Assuming you're using CSS modules

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Column 1: Logo and About */}
          <div className={styles.column}>
            <h4 className={styles.logo}>Freshmart</h4>
            <p className={styles.about}>
              Your one-stop shop for the best fresh grocery for every day. We bring you the finest selection, guaranteed quality, and fast delivery.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.title}>Quick Links</h4>
            <ul className={styles.list}>
              <li><a href="/about" className={styles.link}>About Us</a></li>
              <li><a href="/shop" className={styles.link}>Shop</a></li>
              <li><a href="/faq" className={styles.link}>FAQ</a></li>
              <li><a href="/contact" className={styles.link}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className={styles.column}>
            <h4 className={styles.title}>Contact Us</h4>
            <ul className={styles.list}>
              <li className={styles.contactItem}>Email: support@yourstore.com</li>
              <li className={styles.contactItem}>Phone: +123 456 7890</li>
              <li className={styles.contactItem}>Address: 123 Gift Lane, Gift City, GC 12345</li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className={styles.column}>
            <h4 className={styles.title}>Follow Us</h4>
            <div className={styles.socialLinks}>
              <a href="https://facebook.com" className={styles.socialLink}>Facebook</a>
              <a href="https://instagram.com" className={styles.socialLink}>Instagram</a>
              <a href="https://twitter.com" className={styles.socialLink}>Twitter</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; 2024 YourStoreName. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
