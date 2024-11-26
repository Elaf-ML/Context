import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);

  // Styling for Header components
  const headerStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '15px 20px',
    textAlign: 'center',
    borderRadius: '8px 8px 0 0',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
    margin: '10px 0',
  };

  const navItemStyle = {
    margin: '0 15px',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '500',
  };

  const buttonStyle = {
    backgroundColor: '#FF5733',
    color: '#fff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    margin:'20px'
  };

  return (
    <header style={headerStyle}>
      <h1>MealDB App</h1>

      {/* Navigation links */}
      <ul style={navStyle}>
        <li style={navItemStyle}>
          <Link to="/" style={navLinkStyle}>Home</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/profile" style={navLinkStyle}>Profile</Link>
        </li>
        <li style={navItemStyle}>
          <Link to="/categories" style={navLinkStyle}>Categories</Link>
        </li>
      </ul>

      {/* Conditional rendering based on whether the user is logged in */}
      {user ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <br/>
          <button onClick={logout} style={buttonStyle}>Logout</button>
        </div>
      ) : (
        <span>Please log in</span>
      )}
    </header>
  );
};

export default Header;
