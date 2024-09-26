import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Categories from './Components/Categories';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Home from './Components/Home';
import './index.css';

const App = () => {

  // Function to handle account click, passed to Navbar
  const handleAccountClick = () => {
    console.log('Account clicked');
  };

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
