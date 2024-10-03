import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserLocation } from '../Location'; // Correct import path
import LogoLoader from './LogoLoader'; // Import your LogoLoader component

const NearbyItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [nearbyItems, setNearbyItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Fetch nearby items
  const fetchItemsNearby = useCallback(async () => {
    if (userLocation) {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`http://localhost:5006/${category_name}/${itemId}`);
        setItem(response.data); // Set item data
      } catch (error) {
        console.error('Error fetching nearby items:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    }
  }, [getAccessTokenSilently, userLocation]);

  useEffect(() => {
    getUserLocation()
      .then(({ latitude, longitude, address }) => {
        console.log('User Location:', { latitude, longitude, address }); // Debugging log
        setUserLocation({ latitude, longitude });
        setUserAddress(address || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' });
      })
      .catch((error) => {
        console.error('Error getting user location:', error);
      });
  }, []);

  useEffect(() => {
    if (userLocation) {
      console.log('User Location:', userLocation);
      fetchItemsNearby(); // Fetch nearby items if location is available
    }
  }, [userLocation, fetchItemsNearby]);

  if (loading) {
    return <LogoLoader />; // Show loader while loading
  }

  return (
    <div>
      <h2>Nearby Items</h2>
      <button onClick={fetchItemsNearby}>Fetch Nearby Items</button>
      {userAddress && (
        <p>
          {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
        </p>
      )}
      <ul>
        {nearbyItems.map((item) => (
          <li key={item.Item_id}>
            <h4>{item.Item_name}</h4>
            <p>{item.Description}</p>
            <p>Price: ${item.Price_per_day} per day</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyItems;
