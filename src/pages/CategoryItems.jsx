import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../component/Header';
import { UserContext } from '../contexts/UserContext';

const CategoryItems = () => {
  const { category } = useParams(); 
  const [items, setItems] = useState([]);
  const { saveCategory, user } = useContext(UserContext);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setItems(data.meals || []); 
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };

    fetchCategoryItems();
  }, [category]);

  useEffect(() => {
    if (user && user.savedCategories.includes(category)) {
      setIsSaved(true);
    }
  }, [user, category]);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: '20px auto',
    maxWidth: '600px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const itemStyle = {
    padding: '10px',
    backgroundColor: '#f9f9f9',
    margin: '10px 0',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    backgroundColor: isSaved ? 'green' : '#c72300',
    padding: '15px',
    color: '#fff',
    border: '2px solid ',
    borderRadius: '3px',
  };

  const handleSaveCategory = () => {
    saveCategory(category);
    setIsSaved(true);
  };

  return (
    <div style={containerStyle}>
      <Header />
      <h1>{category} Items</h1>
      <button style={buttonStyle} onClick={handleSaveCategory} disabled={isSaved}>
        {isSaved ? 'Category Saved' : 'Save Category'}
      </button>
      {items.length === 0 ? (
        <p>No items found for this category.</p>
      ) : (
        items.map((item) => (
          <div key={item.idMeal} style={itemStyle}>
            <Link to={`/item/${item.idMeal}`}>
              <h3>{item.strMeal}</h3>
              <img src={item.strMealThumb} alt={item.strMeal} style={{ width: '100%' }} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryItems;