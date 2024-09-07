import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import noFound from "../../assets/noFound.png";
import { toast } from 'react-toastify';
import ProductCard from '../NewProductCart/ProductCard';
const SearchPage = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); 

  const handleSearch = () => {
    setTimeout(() => {
      fetch(`http://127.0.0.1:5000/searchPage/${query.toLowerCase()}`,{
        method:"GET",
        headers:{
          'Content-Type':'applicaion/json'
        }
      }).then((res)=>res.json())
      .then((data)=>{
        const searchData = data.products;
        console.log(searchData)
        searchData.map(item=>console.log(item))
        setResults(searchData)
        setLoading(false)
      }).catch((err)=>{
        setResults([])
        setLoading(false)
    })
    }, 1500);
  };
  useEffect(() => {
    if (query && query.trim() !== "") {
      setLoading(true); // Show spinner while loading
      setTimeout(() => {
        handleSearch();
      }, 1500); // Simulate a delay for search
    }
  }, [query]);

  return (
    <div className={styles.searchContainer}>
      {loading && (
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
      )}

      <div className={styles.searchResults}>
        {results.length === 0 && !loading && (
          <div className={styles.noResultsFound}>
            <img src={noFound} alt="No results found" className={styles.noFoundImage} />
          </div>
        )}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"4vh"}}>
        {results.length > 0 && results.map(item => (
            <ProductCard
            category={item.category}
            isSeller={false}
            isMapped={true}
            imgUrl={item.imgUrl}
            productId={item._id}
            price={item.price}
            quantity={item.quantity}
            description={item.description}
            name={item.productName}
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default SearchPage;
