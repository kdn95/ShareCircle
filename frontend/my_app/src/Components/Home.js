import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ isAuthenticated, user, loginWithRedirect, logout }) => {
  const navigate = useNavigate();

  const handleFetchNearbyItems = () => {
    // Navigate to the nearby items page
    navigate('/items/nearby');
  };

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
      {isAuthenticated && (
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
