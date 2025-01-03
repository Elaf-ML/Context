import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set user to localStorage on login and get it on page load
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (name) => {
    const newUser = { name, favorites: [], savedCategories: [] };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addFavorite = (item) => {
    setUser((prevUser) => {
      const updatedFavorites = [...prevUser.favorites, item];
      const updatedUser = { ...prevUser, favorites: updatedFavorites };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const removeFavorite = (itemId) => {
    setUser((prevUser) => {
      const updatedFavorites = prevUser.favorites.filter(item => item.idMeal !== itemId);
      const updatedUser = { ...prevUser, favorites: updatedFavorites };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const saveCategory = (category) => {
    setUser((prevUser) => {
      const updatedCategories = [...(prevUser.savedCategories || []), category];
      const updatedUser = { ...prevUser, savedCategories: updatedCategories };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const removeSavedCategory = (category) => {
    setUser((prevUser) => {
      const updatedCategories = prevUser.savedCategories.filter(savedCategory => savedCategory !== category);
      const updatedUser = { ...prevUser, savedCategories: updatedCategories };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };
  return (
    <UserContext.Provider value={{ user, login, logout, addFavorite, removeFavorite, saveCategory, removeSavedCategory }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;