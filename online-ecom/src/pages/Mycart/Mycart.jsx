import React from 'react'
import styles from "./Mycart.module.css"
import Navbar from '../../components/Navbar/Navbar'
import CurrencyRupee from '@mui/icons-material/CurrencyRupee'
import fruits from "../../assets/fruits.png"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Mycart() {
  return (
    <div style={{backgroundColor:"rgb(246 241 241)"}}>
    <Navbar/>
    <div className={styles.MycartWrapper}>
            <div className={styles.headings}>
                <h1>Shopping cart</h1>
            </div>
        <div className={styles.structure}>
            <div className={styles.carts}>
             
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
                        <div className={styles.descPrice}>
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
                                <p>Delete</p>
                            </div>
                            <div className={styles.wishlistItem}>
                                <p>Wishlist</p>
                            </div>
                        </div>
                    </div>
            </div>
                    <hr />
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
                        <div className={styles.descPrice}>
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
                                <p>Delete</p>
                            </div>
                            <div className={styles.wishlistItem}>
                                <p>Wishlist</p>
                            </div>
                        </div>
                    </div>
            </div>
            <hr />
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
                        <div className={styles.descPrice}>
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
                                <p>Delete</p>
                            </div>
                            <div className={styles.wishlistItem}>
                                <p>Wishlist</p>
                            </div>
                        </div>
                    </div>
            </div>
            <hr />
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
                        <div className={styles.descPrice}>
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
                                <p>Delete</p>
                            </div>
                            <div className={styles.wishlistItem}>
                                <p>Wishlist</p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
            <div className={styles.recommended}>
                <div className={styles.subTotal}>
                    <div className={styles.subtotalAmt}>
                        <p>Subtotal Items (5): </p>
                        <CurrencyRupee/>
                        <span>500</span>
                    </div>
                    <div className={styles.proceedToBuyBTtn}>
                        <button>Proceed to buy</button>
                    </div>
                </div>
                <div className={styles.pairUpItems}>
                    <h1 style={{marginTop:"2vh"}}>Pair with your cart</h1>
                    <div className={styles.itemsBox}>
                            <div className={styles.imgBox}>
                                <img src={fruits} alt="fruits" />
                            </div>
                            <div className={styles.itemsBoxDesc}>
                                <h4>American apple fresh from farms</h4>
                                <p><CurrencyRupee/>399.00</p>
                                <div className={styles.addCart}>
                                    <button>Add to cart</button>
                                </div>
                                </div>
                    </div>

                    <div className={styles.itemsBox}>
                            <div className={styles.imgBox}>
                                <img src={fruits} alt="fruits" />
                            </div>
                            <div className={styles.itemsBoxDesc}>
                                <h4>American apple fresh from farms</h4>
                                <p><CurrencyRupee/>399.00</p>
                                <div className={styles.addCart}>
                                    <button>Add to cart</button>
                                </div>
                                </div>
                    </div>

                    <div className={styles.itemsBox}>
                            <div className={styles.imgBox}>
                                <img src={fruits} alt="fruits" />
                            </div>
                            <div className={styles.itemsBoxDesc}>
                                <h4>American apple fresh from farms</h4>
                                <p><CurrencyRupee/>399.00</p>
                                <div className={styles.addCart}>
                                    <button>Add to cart</button>
                                </div>
                                </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
