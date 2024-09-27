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
  const { loginWithRedirect } = useAuth0();
  
  const handleAccountClick = () => {
    loginWithRedirect();
  };


  return (
    <Router>
      <Navbar onAccountClick={handleAccountClick} />  {/* Pass the function to Navbar */}
      <Categories />
      <Routes>
      <Route path="/" element={<><Categories /><Home /></>} />
      <Route path="/category/:category_name" element={<CategoryItems />} /> {/* New route for category items */}
      <Route path="/items/nearby" element={<NearbyItems />} />
    </Routes>
  </Router>
  );
};

export default App;
