import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import Auth from './Components/Auth'; // Renamed to Auth
import NearbyItems from './Components/NearbyItems';
import Categories from './Components/Categories';
import CategoryItems from './Components/CategoryItems';
import Home from './Components/Home';
import './index.css';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  // const [userLocation, setUserLocation] = useState(null);
  // const [nearbyItems, setNearbyItems] = useState([]);

  // Find user location
  // const getUserLocation = () => {
  //   // if browser supports geolocation
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ latitude, longitude });
  //       },
  //       (error) => {
  //         console.error('Error getting user location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // };

  // console.log('User location:', userLocation);
  // // Secure fetch for renters/nearby based on location
  // const fetchItemsNearby = useCallback(async () => {
  //   if (userLocation) {
  //     try {
  //       const token = await getAccessTokenSilently();
  //       const response = await fetch(`http://localhost:5007/items/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius_km=10`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       // error handling
  //       if (!response.ok) {
  //         const errorMessage = await response.text();
  //         throw new Error(`Error fetching nearby items: ${errorMessage}`);
  //       }

  //       const data = await response.json();
  //       setNearbyItems(data);
  //       console.log('Set Nearby Items:', data);
  //     } catch (error) {
  //       console.error('Error fetching protected data:', error);
  //     }
  //   } else {
  //     console.error('User location not available');
  //   }
  // }, [getAccessTokenSilently, userLocation]);

  // Call fetch data if authenticated and location is available
  // useEffect(() => {
  //   if (isAuthenticated && userLocation) {
  //     fetchProtectedData();
  //   }
  // }, [isAuthenticated, fetchProtectedData, userLocation]);

  // Trigger geolocation when user is authenticated
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // ask user's location after authentication
  //     getUserLocation(); 
  //   }
  // }, [isAuthenticated]);

  // // Fetch nearby items after getting the user's location
  // useEffect(() => {
  //   if (userLocation) {
  //     fetchItemsNearby();
  //   }
  // }, [userLocation, fetchItemsNearby]);

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
