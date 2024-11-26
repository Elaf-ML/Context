import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import LoginForm from '../component/LoginForm';
import Header from "../component/Header"
const Home = () => {
  const { user } = useContext(UserContext);

  const homeStyle = {
    color: '#333',
    margin: '0 auto',
    maxWidth: '600px',
  };

  return (
    <div style={homeStyle}>
      {user ?  <Header/>  : <LoginForm />}
    </div>
  );
};

export default Home;
