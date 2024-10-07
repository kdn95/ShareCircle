import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import to access the category name from the URL
import { useAuth0 } from '@auth0/auth0-react';
import { getUserLocation } from '../Location'; // Correct import path
import mapboxgl from 'mapbox-gl'; // Import Mapbox
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import LogoLoader from './LogoLoader'; // Import your LogoLoader component
import '../index.css'; // Assuming your custom CSS is here

const NearbyItems = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [nearbyItems, setNearbyItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]);
  const { category_name } = useParams(); // Get the category name from the URL

  mapboxgl.accessToken = process.env.REACT_APP_MB_TOKEN; // Replace with your access token

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
        const response = await fetch(`http://localhost:5005/items/nearby?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&radius_km=1000`, {
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
        mapRef.current = null;
      }
    };
  }, [userLocation]);
    
  // Items nearby my location
  useEffect(() => {
    if (userLocation && nearbyItems.length > 0) {
      clearMarkers(); // Clear any previous markers
      nearbyItems.forEach(item => {
        // Add item markers to map (using renter's location)
        console.log('Renter Location:', item.renter_longitude, item.renter_latitude);
        if (item.renter_latitude && item.renter_longitude) {
          console.log(`Creating marker at: ${item.renter_longitude}, ${item.renter_latitude}`);
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
      // console.log('Nearby Items state:', nearbyItems); // Add this log
      fetchItemsNearby(); // Fetch nearby items if location is available
    }
  }, [userLocation, fetchItemsNearby]);

  return (
    <div className="Nearby-items-map-container">
      <h1 className="Nearby-items">Nearby Items</h1>
      {userAddress && (
        <p className="user-address">
          {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
        </p>
      )}
  
      {/* Map container */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '300px' }} className="map-container" />
  
      {/* Show loader while fetching data */}
      {loading ? (
        <LogoLoader />
      ) : (
        <div className="Nearby-items-container">
          {nearbyItems.length > 0 ? (
            <div className="cards-grid">
              {nearbyItems.map(item => (
                <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
                  <Link to={`/category/${item.category}/${item.Item_id}`} className="no-undies">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        className="Nearby-item-image"
                        height="100"
                        image={item.Image_url}
                        alt={item.Item_name}
                      />
                      <CardContent>
                        <h3 className="item-header">{item.Item_name}</h3>
                        <div className="rating-container">
                          <StarIcon className="star-icon" alt="star-icon" />
                          <p className="renter-rating">{item.Rating}</p>
                        </div>
                        <p className="item-price">Price: ${item.Price_per_day} per day</p>
                        <p className="renter-name">Renter: {item.Renter_name}</p>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p>No nearby items found.</p>
          )}
        </div>
      )}
    </div>
  );  
};

export default NearbyItems;
