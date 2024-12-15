import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import LoginForm from '../component/LoginForm';
import Header from "../component/Header"
import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const Home = () => {
  const { user } = useContext(UserContext);
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const homeStyle = {
    color: '#333',
    margin: '0 auto',
    maxWidth: '600px',
  };

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
  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`);
        const data = await response.json();
        setItems(data.meals || []); // Assuming meals data is returned
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };

    fetchCategoryItems();
  }, [category]);

  return (
    <div style={homeStyle}>
      {user ? 
      <div>
      <Header/> 
      <h1>{category} Items</h1>
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
      : <LoginForm />}
    </div>
  );
};

export default Home;
