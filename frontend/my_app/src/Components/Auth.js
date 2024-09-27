import React, { useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = ({ onAccountClick }) => {
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  // for secure fetch for renters/nearby
  const fetchProtectedData = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:5008/items/nearby', {
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
      {!isAuthenticated ? (
        <button onClick={loginWithRedirect}>Log In</button>
      ) : (
        <>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
          <h2>Welcome, {user.name}!</h2>
        </>
      )}
    </div>
  );
};

export default Auth;
