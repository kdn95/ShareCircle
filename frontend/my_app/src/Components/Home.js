import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import fetchItemsNearby from './NearbyItems';


const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  // Fetch protected data for renters/nearby items
  const fetchProtectedData = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:5008/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data); // Handle data as needed
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProtectedData();
    }
  }, [isAuthenticated, fetchProtectedData]);

  const handleFetchHome =  () => {
    navigate('/');
  };
  
  // Navigate to nearby items
  const handleFetchNearbyItems = () => {
    navigate('/items/nearby');
  };

  return (
    <div>
  {!isAuthenticated ? (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  ) : (
    <>
      <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
      <h2>Welcome, {user.name}!</h2>
      {/* Button to fetch nearby items */}
      <button onClick={handleFetchNearbyItems}>Fetch Nearby Items</button>
    </>
  )}
</div>
  );
};

export default Home;
