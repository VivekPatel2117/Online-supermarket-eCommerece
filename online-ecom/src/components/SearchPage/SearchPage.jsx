import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import noFound from "../../assets/noFound.png";

const SearchPage = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Better state management for loading

  // Mock search function
  const handleSearch = () => {
    const mockResults = [
      { id: 1, title: 'Result 1', description: 'This is the first search result' },
      { id: 2, title: 'Result 2', description: 'This is the second search result' },
      { id: 3, title: 'Result 3', description: 'This is the third search result' },
    ];

    setResults(mockResults.filter(result => result.title.toLowerCase().includes(query.toLowerCase())));
    setLoading(false); // Stop the spinner when search is done
  };

  useEffect(() => {
    if (query && query.trim() !== "") {
      setLoading(true); // Show spinner while loading
      setTimeout(() => {
        handleSearch();
      }, 2000); // Simulate a delay for search
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

        {results.length > 0 && results.map(result => (
          <div key={result.id} className={styles.resultItem}>
            <h2 className={styles.resultTitle}>{result.title}</h2>
            <p className={styles.resultDescription}>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
