import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserLocation } from '../Location'; // Correct import path
import mapboxgl from 'mapbox-gl'; // Import Mapbox
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS


const NearbyItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [nearbyItems, setNearbyItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState({});
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcmVjaXJjbGUtdGVhbSIsImEiOiJjbTFyNng1MGgwN3JtMmxvZnUwOWZ3ZGh0In0.FUYlTsV3I4uZKwf0r6ZOkQ';


  // Fetch nearby items
  const fetchItemsNearby = useCallback(async () => {
    if (userLocation) {
      setLoading(true); // Set loading to true before fetching
      try {
        // no issues with getting token
        const token = await getAccessTokenSilently();
        // const response = await fetch(`https://project-sc.onrender.com/items/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius_km=1000`, {
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
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    }
  }, [getAccessTokenSilently, userLocation]);

  // Update map with nearby item markers when they are fetched
  useEffect(() => {
    if (mapRef.current && nearbyItems.length > 0) {
      nearbyItems.forEach(item => {
        if (item.longitude && item.latitude) {
          new mapboxgl.Marker()
            .setLngLat([item.longitude, item.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h4>${item.Item_name}</h4><p>Price: $${item.Price_per_day}/day</p>`))
            .addTo(mapRef.current);
        }
      });
    }
  }, [nearbyItems]);


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

  return (
    <div>
      <h2>Nearby Items</h2>
      <button onClick={fetchItemsNearby}>Fetch Nearby Items</button>
      {userAddress && (
        <p>
          {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
          </p>
        )}

      {/* Add the map container */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '500px' }} // Adjust map container height/width as needed
        className="map-container"
      />

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
