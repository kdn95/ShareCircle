import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import ItemsListing from './Components/Items';
import Home from './Components/Home';
import './index.css';
import SuccessPage from './Components/SuccessPage';
import Profile from './Components/Profile';
import { Session } from '@talkjs/react';
import Talk from 'talkjs';

const App = () => {
  const { loginWithRedirect, user } = useAuth0(); // Get user data from Auth0

  const handleAccountClick = () => {
    loginWithRedirect();
  };

  const syncUser = useCallback(() => {
    if (!user) {
      return new Talk.User({
        id: 'guest', // Fallback ID if user is not authenticated
        name: 'Guest',
        email: 'guest@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    }

    // Replace with actual user data from Auth0
    return new Talk.User({
      id: user.sub, // Use the Auth0 user ID
      name: user.name || 'User', // Use the Auth0 user's name
      email: user.email, // Use the Auth0 user's email
      photoUrl: user.picture || 'https://talkjs.com/new-web/avatar-7.jpg', // Use Auth0 user's picture
      welcomeMessage: 'Hi!',
    });
  }, [user]); // Add user as a dependency

  const syncConversation = useCallback((session) => {
    // You can create a placeholder conversation or handle it in each component
    const conversation = session.getOrCreateConversation('new_conversation');
    return conversation;
  }, []);

  return (
    <Session appId="tD4xpjcO" syncUser={syncUser}>
      <Router>
        <Routes>
          <Route path="/items/nearby" element={<NearbyItems />} />
          <Route path="/" element={<Categories />} />
          <Route path="/profile" element={<><Home /><Profile /></>} />
          <Route path="/category/:category_name" element={<CategoryItems />} />
          <Route path="/category/:category_name/:itemId" element={<ItemsListing syncConversation={syncConversation} />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Navbar onAccountClick={handleAccountClick} />
      </Router>
    </Session>
  );
};

export default App;
