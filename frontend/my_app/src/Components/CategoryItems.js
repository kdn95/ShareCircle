import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import '../index.css'; // Assuming your custom CSS is here
import { getUserLocation } from '../Location';
import LogoLoader from './LogoLoader'; // Import your LogoLoader component

// distance calculator for all items 
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};


const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [userAddress, setUserAddress] = useState({});
  const [loading, setLoading] = useState(true); // Initialize loading state

  const fetchCategoryItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5004/${category_name}`);
      console.log('API Response:', response.data);

      const theLot = response.data;

      if (userAddress.latitude && userAddress.longitude) {
        const updatedItems = theLot.map(item => {
          console.log('Item Coordinates:', item.renter_latitude, item.renter_longitude);
          let distance = null;
          if (item.renter_latitude && item.renter_longitude) {
            distance = calculateDistance(
              userAddress.latitude,
              userAddress.longitude,
              item.renter_latitude,
              item.renter_longitude
            );
          }
          return { ...item, distance };
        });
        setItems(updatedItems);
      } else {
        setItems(theLot);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, [category_name, userAddress]);

  useEffect(() => {
    fetchCategoryItems();

    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        console.log('User location:', location); // Debugging log
        setUserAddress({
          street: location.address?.street || 'Unknown',
          city: location.address?.city || 'Unknown',
          state: location.address?.state || 'Unknown',
          postcode: location.address?.postcode || '',
          latitude: location.latitude,    // Add latitude
          longitude: location.longitude,  // Add longitude
        });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };
    

    fetchUserLocation(); // Get user location when component mounts
  }, []);

  if (loading) {
    return <LogoLoader />; // Show loader while loading
  }

  return (
    <div className="Category-items-container">
      <div className="Category-items-title-address-container">
        <h1 className="Category-items-title">Items in {category_name}</h1>
        {userAddress && (
          <p className="user-address">
            {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
          </p>
        )}{/* Display user's address */}
      </div>
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <Card sx={{}} key={item.Item_id} className="category-items-card">
              <Link to={`/category/${category_name}/${item.Item_id}`} className="no-undies"> {/* Link to item details */}
                <CardActionArea>
                  <CardMedia
                      component="img"
                      className="item-image"
                      image={item.Image_url}
                      alt={item.Item_name}
                  />
                  <CardContent>
                    <h3 className="item-header">{item.Item_name}</h3>
                    <div className="renter-container">
                      <div className="renter-info">
                        <img
                        src={item.Profile_pic}
                        alt="Renter Profile"
                        className="renter-profile-pic"
                        />
                        <div className="renter-details">
                          <p className="renter-full-name">{item.Renter_name}</p>
                          <div className="rating-container">
                            <p className="renter-rating"> {item.Rating}</p> {/* Add rating instead */}
                            <StarIcon className="star-icon" alt="star-icon" />
                          </div>
                        </div>
                      </div>
                      <p className="item-price">Price: ${item.Price_per_day} per day</p>
                      {/* {item.distance !== null && ( */}
                        <p className="item-distance">Distance: {item.distance} km</p>
                        {/* )} */}
                      {/* <img src={item.Image_url} alt={item.Item_name} /> */}
                    </div>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
