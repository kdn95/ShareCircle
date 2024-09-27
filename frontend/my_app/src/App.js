import React from 'react';
import Categories from './Components/Categories';
import Navbar from './Components/Navbar';
import Auth from './Components/Auth'; // Renamed to Auth
import { useAuth0 } from '@auth0/auth0-react'; // Import Auth0 hook
import './index.css';

const App = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // Get login and auth state from Auth0

  // Function to handle account click
  const handleAccountClick = () => {
    if (!isAuthenticated) {
      loginWithRedirect(); // Redirect to login if not authenticated
    } else {
      console.log('Account clicked');
    }
  };

  return (
    <div>
      <Auth onAccountClick={handleAccountClick} /> {/* Auth0 component */}
      <Categories /> {/* Render the Categories component */}
      <Navbar onAccountClick={handleAccountClick} /> {/* Pass the function to Navbar */}
    </div>
  );
};

export default App;
