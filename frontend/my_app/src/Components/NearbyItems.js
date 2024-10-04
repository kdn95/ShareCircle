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
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]);


  mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcmVjaXJjbGUtdGVhbSIsImEiOiJjbTFyNjZ0MXIwN3Y5MmpuNHoyaGFrN3I2In0.R6r5R4DZM3oAi3nBNyCvNg'; // Replace with your access token

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = []; // Clear markers array
  };

  // Fetch nearby items
  const fetchItemsNearby = useCallback(async () => {
    if (userLocation) {
      setLoading(true); // Set loading to true before fetching
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`http://localhost:5009/items/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius_km=50`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to fetch nearby items');
        }

        const data = await response.json();
        setNearbyItems(data);
        console.log("Fetched Nearby Items:", data);
      } catch (error) {
        console.error('Error fetching nearby items:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    }
  }, [getAccessTokenSilently, userLocation]);

  useEffect(() => {
      if (userLocation && mapContainerRef.current) {
        // Initialize the map
        if (!mapRef.current) {
          mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/standard', // Make sure this is the correct style
            center: [userLocation.longitude, userLocation.latitude], // Center map on user's location
            zoom: 11,
          });

          const navControl = new mapboxgl.NavigationControl();
          mapRef.current.addControl(navControl, 'top-right'); // Add to top-right corner

          mapRef.current.addControl(
            new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true
              },
              trackUserLocation: true,
              showUserHeading: true
            })
          );
    
          // Create the user marker
          userMarkerRef.current = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([userLocation.longitude, userLocation.latitude])
            .setPopup(new mapboxgl.Popup().setHTML('<h4>You are here!</h4>'))
            .addTo(mapRef.current);
        } else {
          // Update map center and user marker if already initialized
          mapRef.current.setCenter([userLocation.longitude, userLocation.latitude]);
          userMarkerRef.current.setLngLat([userLocation.longitude, userLocation.latitude]);
        }
      }
    
      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
        }
      };
    }, [userLocation]);
    
    //items nearby my location
    useEffect(() => {
      if (userLocation && nearbyItems.length > 0) {
        clearMarkers(); // Clear any previous markers
        nearbyItems.forEach(item => {
          // Add item markers to map (using renter's location)
          console.log('Renter Location:', item.renter_longitude, item.renter_latitude);
          if (item.renter_latitude && item.renter_longitude) {
            const marker = new mapboxgl.Marker()
              .setLngLat([item.renter_longitude, item.renter_latitude])
              .setPopup(new mapboxgl.Popup().setHTML(`
                <h4>${item.Item_name}</h4>
                <p>Price: $${item.Price_per_day}/day</p>
                <p>Renter: ${item.Renter_name}</p>
              `))
              .addTo(mapRef.current);
            markersRef.current.push(marker); // Store marker reference
          }
        });
      }
    }, [userLocation, nearbyItems]);


  useEffect(() => {
    getUserLocation()
      .then(({ longitude, latitude, address }) => {
        console.log('User Location:', { longitude, latitude, address }); // Debugging log
        setUserLocation({ longitude, latitude });
        setUserAddress(address || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' });
      })
      .catch((error) => {
        console.error('Error getting user location:', error);
      });
  }, []);

  useEffect(() => {
    if (userLocation) {
      console.log('User Location:', userLocation);
      console.log('Nearby Items state:', nearbyItems); // Add this log
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

      {/* Map container */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '300px' }} // Adjust map container height/width as needed
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
