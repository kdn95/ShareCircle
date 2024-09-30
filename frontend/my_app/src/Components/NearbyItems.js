import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const NearbyItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [nearbyItems, setNearbyItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // Function to get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      });
    }
  };

  // Fetch nearby items
  const fetchItemsNearby = async () => {
    if (userLocation) {
      try {
        // no issues with getting token
        const token = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:5008/items/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius_km=1000`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch nearby items');
        }

        const data = await response.json();
        setNearbyItems(data);
      } catch (error) {
        console.error('Error fetching nearby items:', error);
      }
    }
  };

  useEffect(() => {
    getUserLocation(); // Get user location when component mounts
  }, []);

  useEffect(() => {
    if (userLocation) {
      console.log('User Location:', userLocation);
      fetchItemsNearby(); // Fetch nearby items if location is available
    }
  }, [userLocation]);

  return (
    <div>
      <h2>Nearby Items</h2>
      <button onClick={fetchItemsNearby}>Fetch Nearby Items</button>
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
