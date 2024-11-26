import React from 'react';
import { UserProvider } from './contexts/UserContext';
import AppRouter from './AppRouter';

const App = () => {
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  };

  return (
    <UserProvider>
      <div style={appStyle}>
        <AppRouter />
      </div>
    </UserProvider>
  );
};

export default App;
