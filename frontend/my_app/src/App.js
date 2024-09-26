import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Categories from './Components/Categories';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Home from './Components/Home';
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
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home 
            isAuthenticated={isAuthenticated} 
            user={user} 
            loginWithRedirect={loginWithRedirect} 
            logout={logout} 
          />}
          />
        <Route path="/items/nearby" element={<NearbyItems />} />
      </Routes>
      <Categories /> {/* Render the Categories component */}
      <Navbar onAccountClick={handleAccountClick} /> {/* Pass the function to Navbar */}
    </div>
  );
};

export default App;
