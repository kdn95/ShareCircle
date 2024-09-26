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
    <div>
      <Auth onAccountClick={handleAccountClick} /> {/* Auth0 component */}
      <Categories /> {/* Render the Categories component */}
      <Navbar onAccountClick={handleAccountClick} /> {/* Pass the function to Navbar */}
    </div>
  );
};

export default App;
