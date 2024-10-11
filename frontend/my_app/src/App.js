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
import { Session, Inbox } from '@talkjs/react';
import Talk from 'talkjs';

const App = () => {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  const handleAccountClick = () => {
    loginWithRedirect();
  };
  
  const syncUser = useCallback(() => {
    if (isAuthenticated && user) {
      return new Talk.User({
        id: user.sub,
        name: user.name,
        email: user.email,
        photoUrl: user.picture || 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    } else {
      // Return a default guest user if not authenticated
      return new Talk.User({
        id: 'guest',
        name: 'Guest',
        email: 'guest@example.com',
        photoUrl: 'https://talkjs.com/new-web/avatar-7.jpg',
        welcomeMessage: 'Hi!',
      });
    }
    
  }, [isAuthenticated, user]);
  

  // const syncConversation = useCallback((session) => {
  //   // You can create a placeholder conversation or handle it in each component
  //   const conversation = session.getOrCreateConversation('new_conversation');
  //   return conversation;
  // }, []);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  return (
    <Router>
      <Routes>
        <Route path="/items/nearby" element={<NearbyItems />} />
        <Route path="/" element={<Categories />} />
        <Route path="/profile" element={<><Home /><Profile /></>} />
        <Route path="/category/:category_name" element={<CategoryItems />} /> {/* New route for category items */}
        <Route path="/category/:category_name/:itemId" element={<ItemsListing />} /> {/* New route for item details */}
        <Route path="/chat/:renterId" element={<ChatPage />} />{/* New route for item details */}
        <Route path="/success" element={<SuccessPage />} /> {/* New route for SuccessPage */}
      </Routes>
    <Navbar onAccountClick={handleAccountClick} />  {/* Pass the function to Navbar */}
  </Router>
  );
};

export default App;
