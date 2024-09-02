import React from 'react'
import styles from "./Mycart.module.css"
import Navbar from '../../components/Navbar/Navbar'
import CurrencyRupee from '@mui/icons-material/CurrencyRupee'
import fruits from "../../assets/fruits.png"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Mycart() {
  return (
    <>
    <Navbar/>
    <div className={styles.MycartWrapper}>
            <div className="headings">
                <h1>Shopping cart</h1>
            </div>
        <div className={styles.structure}>
            <div className={styles.cartItems}>
                {/* Mapping function */}
                    <div className={styles.productImg}>
                        <img src={fruits} alt="freshmart" />
                    </div>
                    <div className={styles.description}>
                        <div className={styles.descHead}>
                            <h4>Fresh Apples</h4>
                            <p>5 kg</p>
                        </div>
                        <div className="descQuantity">
                            <p> <CurrencyRupee/>250</p>
                        </div>
                        <div className={styles.actions}>
                            <div className={styles.updateQuantity}>
                                <button>
                                    <AddIcon/>
                                 </button>
                                <p>5</p>
                                <button>
                                <RemoveIcon/>
                                </button>
                            </div>
                            <div className={styles.removeItem}>
                                <p>delete</p>
                            </div>
                            <div className={styles.wishlistItem}>
                                <p>Wishlist</p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className={styles.recommended}>
                <div className="summary">
                    <div className="amount">
                        <p>Subtotal</p>
                        <span>Items (5)</span>
                        <span><CurrencyRupee/> 500</span>
                    </div>
                    <div className="buyNow">
                        <button>Proced to buy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
