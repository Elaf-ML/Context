import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { UserContext } from '../contexts/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      if (user && user.savedCategories.length > 0) {
        try {
          const allItems = [];
          for (const category of user.savedCategories) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            allItems.push(...(data.meals || []));
          }
          // Shuffle the array and slice the first 5 elements
          const shuffledItems = allItems.sort(() => 0.5 - Math.random()).slice(0, 5);
          setItems(shuffledItems);
        } catch (error) {
          console.error("Error fetching category items:", error);
        }
      }
      setLoading(false);
    };

    fetchCategoryItems();
  }, [user]);
  const ButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px',
    borderRadius: '5px',

  };
  const homeStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: '20px auto',
    maxWidth: '1200px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const itemContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  };

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    margin: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '200px',
  };

  const imgStyle = {
    width: '100%',
    borderRadius: '4px',
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={homeStyle}>
        <Header />
        <h1>Welcome to Our Recipe App</h1>
        <p>Please log in to see your saved categories.</p>
       <Link to={'/LoginForm'}><button style={ButtonStyle}>Go to Login</button></Link> 
      </div>
    );
  }

  return (
    <div style={homeStyle}>
      <Header />
      <h1>Saved Category Items</h1>
      {items.length === 0 ? (
        <p>No items found for your saved categories.</p>
      ) : (
        <div style={itemContainerStyle}>
          {items.map((item) => (
            <div key={item.idMeal} style={itemStyle}>
              <Link to={`/item/${item.idMeal}`}>
                <img src={item.strMealThumb} alt={item.strMeal} style={imgStyle} />
                <h3>{item.strMeal}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;