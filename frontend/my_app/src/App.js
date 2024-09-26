import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Home from './Components/Home';
import './index.css';

const App = () => {
  const { loginWithRedirect } = useAuth0();
  
  const handleAccountClick = () => {
    loginWithRedirect();
  };

  // Function to handle account click
  const handleAccountClick = () => {
    loginWithRedirect();
  };

  // for secure fetch for renters/nearby
  const fetchProtectedData = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:5003/renters/nearby', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Use this data in your frontend
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [isAuthenticated, fetchProtectedData]);

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          <h2>Welcome, {user.name}!</h2>
        </>
      )}
      <Categories /> {/* Render the Categories component */}
      <Navbar onAccountClick={handleAccountClick} /> {/* Pass the function to Navbar */}
    </div>
  );
};

export default App;
