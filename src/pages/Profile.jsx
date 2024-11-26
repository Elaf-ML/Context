import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
const Profile = () => {
  const { user } = useContext(UserContext);

  if (!user) return <div>Please log in to see your profile.</div>;

  return (
    <div>
      <Header />
      <h1>{user.name}'s Profile</h1>
      <h2>Your Favorites</h2>
      {user.favorites.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <ul>
          {user.favorites.map((item) => (
            <li key={item.idMeal}>
              <Link to={`/item/${item.idMeal}`}>
                {item.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
