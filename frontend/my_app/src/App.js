import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import ItemsListing from './Components/Items';
import Home from './Components/Home';
import './index.css';
import SuccessPage from './Components/SuccessPage';

// Custom redirect callback function
const onRedirectCallback = (appState, navigate) => {
  const redirectTo = appState?.returnTo || '/profile';
  navigate(redirectTo);
};

// Auth0 wrapper component that ensures 'useNavigate' is called within a Router context
const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      onRedirectCallback={(appState) => onRedirectCallback(appState, navigate)} // Set custom redirect callback
    >
      {children}
    </Auth0Provider>
  );
};

const App = () => {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route path="/items/nearby" element={<NearbyItems />} />
          <Route path="/" element={<Categories />} />
          <Route path="/profile" element={<><Home /><Profile /></>} />
          <Route path="/category/:category_name" element={<CategoryItems />} />
          <Route path="/category/:category_name/:itemId" element={<ItemsListing />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Navbar />
      </Auth0ProviderWithNavigate>
    </Router>
  );
};

export default App;
