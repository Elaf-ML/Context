import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import Header from '../component/Header';

const Profile = () => {
  const { user, removeSavedCategory ,removeFavorite } = useContext(UserContext);

  if (!user) return <div>Please log in to see your profile.</div>;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '0 auto',
    maxWidth: '1200px',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    margin: '10px',
    border: '1px solid #000',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '150px',
  };

  const imgStyle = {
    width: '100%',
    borderRadius: '8px',
  };

  const RemoveButton={
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px',
    borderRadius: '5px',
    cursor: 'pointer',


  }
  const handleRemoveCategory = (category) => {
    removeSavedCategory(category);
  };
  const handleRemoveFavo = (category) => {
    removeFavorite(category);
  };

  return (
    <div style={containerStyle}>
      <Header />
      <h1>{user.name}'s Profile</h1>
      <h2>Your Favorites</h2>
      {user.favorites.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <div style={cardContainerStyle}>
          {user.favorites.map((item) => (
            <div key={item.idMeal} style={cardStyle}>
              <Link to={`/item/${item.idMeal}`}>
                <img
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  style={imgStyle}
                />
                <p>{item.strMeal}</p>
              </Link>
              <button style={RemoveButton} onClick={() => handleRemoveFavo(item)}>Remove</button>

            </div>
          ))}
        </div>
      )}
      <h2>Saved Categories</h2>
      {user.savedCategories.length === 0 ? (
        <p>You have no saved categories yet.</p>
      ) : (
        <div style={cardContainerStyle}>
          {user.savedCategories.map((category, index) => (
            <div key={index} style={cardStyle}>
              <Link to={`/categories/${category}`}>
                <img
                  src={`https://www.themealdb.com/images/category/${category}.png`}
                  alt={category}
                  style={imgStyle}
                />
                <p>{category}</p>
              </Link>
              <button style={RemoveButton} onClick={() => handleRemoveCategory(category)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;