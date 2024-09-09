import React from 'react';
import styles from './PaymentSuccess.module.css';

const PaymentSuccess = ({amount}) => {
    return (
        <div className={styles.container}>
            <div className={styles.successBox}>
                <div className={styles.checkmarkIcon}></div>
                <div className={styles.message}>Payment Completed of {amount}</div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
