import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
  const { id } = useParams();
  const { user, addFavorite, removeFavorite } = useContext(UserContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setItem(data.meals[0]);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const isFavorite = user ? user.favorites.some(fav => fav.idMeal === item?.idMeal) : false;

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(item.idMeal);
    } else {
      addFavorite(item);
    }
  };

  if (!item) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">{item.strMeal}</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <img
          className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0"
          src={item.strMealThumb}
          alt={item.strMeal}
        />
        <div className="md:w-1/2 md:pl-8">
          <p className="text-lg text-gray-700">{item.strInstructions}</p>
        </div>
      </div>

      {/* Add to favorites button */}
      {user && (
        <div className="text-center mt-4">
          <button
            onClick={handleFavorite}
            className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
              isFavorite
                ? 'bg-red-500 text-white hover:bg-red-700'
                : 'bg-green-500 text-white hover:bg-green-700'
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
