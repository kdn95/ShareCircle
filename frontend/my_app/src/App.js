import React from 'react';
import Categories from './Components/Categories';
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
