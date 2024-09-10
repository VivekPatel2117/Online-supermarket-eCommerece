import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
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
              <li><Link to="/about" className={styles.link}>About Us</Link></li>
              <li><Link to="/terms" className={styles.link}>Terms & Condition</Link></li>
              <li><Link to="/" className={styles.link}>Seller login</Link></li>
              <li><Link to="/seller" className={styles.link}>Seller Register</Link></li>
              <li><Link to="/logout" className={styles.link}>Logout</Link></li>
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
