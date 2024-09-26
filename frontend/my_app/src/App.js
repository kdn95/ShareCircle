import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import Home from './Components/Home';
import './index.css';

const App = () => {

  // Function to handle account click, passed to Navbar
  const handleAccountClick = () => {
    console.log('Account clicked');
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
    <Router>
      <Navbar onAccountClick={handleAccountClick} /> {/* Pass the function to Navbar */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items/nearby" element={<NearbyItems />} />
    </Routes>
  </Router>
  );
};

export default App;
