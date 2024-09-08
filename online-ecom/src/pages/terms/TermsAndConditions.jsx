import React from 'react';
import styles from './TermsAndConditions.module.css';

const TermsAndConditions = () => {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.heading}>Terms and Conditions</h1>
      <p className={styles.updated}>Last updated: [05 / 09 / 2024]</p>
      
      <section className={styles.section}>
        <h2 className={styles.subHeading}>1. Introduction</h2>
        <p className={styles.paragraph}>Welcome to Freshmart. These Terms and Conditions outline the rules and regulations for using our platform.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>2. User Account</h2>
        <p className={styles.paragraph}>When creating an account on Freshmart, you agree to provide accurate and complete information. You are responsible for keeping your account details confidential.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>3. Orders and Payments</h2>
        <p className={styles.paragraph}>All orders are subject to product availability and confirmation of the order price. Payments can be made via cash, card, or UPI.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>4. Delivery</h2>
        <p className={styles.paragraph}>Freshmart ensures timely delivery of your orders. However, delivery times may vary based on location and external factors.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>5. Returns and Refunds</h2>
        <p className={styles.paragraph}>If you're unsatisfied with any product, you may request a return or refund in accordance with our return policy.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>6. Modification of Terms</h2>
        <p className={styles.paragraph}>Freshmart reserves the right to modify these Terms and Conditions at any time. The updated terms will be posted on our platform.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.subHeading}>7. Contact Us</h2>
        <p className={styles.paragraph}>If you have any questions about these Terms, please contact us at support@freshmart.com.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
