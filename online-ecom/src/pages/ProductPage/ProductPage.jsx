import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './ProductPage.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/NewProductCart/ProductCard';

export default function ProductPage() {
  const { category } = useParams();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryProduct = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/get_all_products/${category}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductList(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error occurred while fetching products: ", err);
        toast.error("Error occurred while getting products", {
          autoClose: 3000,
          position: 'top-center',
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    window.scrollTo(0,0)
    handleCategoryProduct();
  }, [category]); // category added as a dependency

  return (
    <div>
      <Navbar />
      <div className={styles.productPageWrapper}>
        <h1 style={{fontFamily:"serif",color:"black"}}>{category}</h1>
        <div className={styles.products}>
          {loading ? (
             <div style={{ placeSelf: "center",display:"flex", justifyContent:"center",alignItems:"center", height:"75vh" }}>
             <div
               className="spinner"
               style={{
                 width: "15vh",
                 border: "4px solid #624FC2",
                 borderRightColor: "white",
               }}
             />
           </div>
          ) : (
            <>
              {productList.length > 0 ? (
                productList.map((item, index) => (
                  <ProductCard
                    key={index}
                    isDelete={false}
                    isSeller={false}
                    isMapped={true}
                    imgUrl={item.imgUrl}
                    productId={item._id}
                    price={item.price}
                    quantity={item.quantity}
                    description={item.description}
                    name={item.productName}
                    category={item.category}
                  />
                ))
              ) : (
                <p style={{fontSize:"4vh",marginTop:"2vh"}}>No products found in this category.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
