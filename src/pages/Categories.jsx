import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    margin: '20px auto',
    maxWidth: '600px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#007BFF',
    padding: '10px',
    display: 'block',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  };

  return (
    <div style={containerStyle}>
      <Header/>
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        categories.map((category) => (
          <Link
            key={category.idCategory}
            to={`/categories/${category.strCategory}`}
            style={linkStyle}
          >
            {category.strCategory}
          </Link>
        ))
      )}
    </div>
  );
};

export default Categories;
