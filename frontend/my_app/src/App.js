import React from 'react';
import Categories from './Components/Categories';
import Navbar from './Components/Navbar';
import Auth from './Components/Auth'; // Renamed to Auth
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
