import React,{useState,useRef,useEffect} from 'react'
import styles from './ProductSection.module.css'
import ProductCard from '../ProductCard/ProductCard'
export default function ProductsSection({constraint,title}) {
    const productsRef = useRef(null);
    useEffect(() => {
      const handleScroll = () => {
        if (productsRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = productsRef.current;
          setIsRightClicked(scrollLeft + clientWidth < scrollWidth);
        }
      };
    
      if (productsRef.current) {
        productsRef.current.addEventListener('scroll', handleScroll);
        handleScroll(); // Initialize visibility on mount
      }
    
      return () => {
        if (productsRef.current) {
          productsRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);
    
    const [isRightClicked, setIsRightClicked] = useState(false)
  const scrollLeft = () => {
    if (productsRef.current) {
      productsRef.current.scrollBy({ left: -1000, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    setIsRightClicked(true)
    if (productsRef.current) {
      productsRef.current.scrollBy({ left: 1000, behavior: 'smooth' });
    }
  };

const [data, setData] = useState([]);
const handleGetProduct = async(category) =>{
  const productList = await fetch(`http://127.0.0.1:5000/get_all_products/${category}`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    }
  });
  if(productList.status === 200){
    const responsData = await productList.json();
    setData(responsData.data)
  }
};
useEffect(() => {
  handleGetProduct(constraint);
}, [])

  return (
    <div className={styles.ProductsSectionWrapper}>
        <div className={styles.ProductsSectionHeading}>
            <h1>{title}</h1>
        </div>
        <div className={styles.ProductsSectionProduct}>
            <div onClick={scrollLeft} style={{visibility: isRightClicked ? "visible" : "hidden"}} className={styles.left}>{"<"}</div>
            <div className={styles.products} ref={productsRef}>
                {data.length > 0 ? (
                  <>
                {data.map((item,index)=>(
                    <ProductCard id={item._id} key={index} ProductImg={item.imgUrl} ProductName={item.productName} ProductPrice={item.price} productDesc={item.description}/>
                ))}
                  </>
                ):(
                  <p>No data found</p>
                )}
            </div>
            <div onClick={scrollRight} className={styles.right}>{">"}</div>
        </div>
    </div>
  )
}
