import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import '../index.css'; // Assuming your custom CSS is here
import { getUserLocation } from '../Location';

const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [userAddress, setUserAddress] = useState({});

  const fetchCategoryItems = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5007/${category_name}`); // Fetch items by category
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [category_name]);

  useEffect(() => {
    fetchCategoryItems();
    
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        console.log('User location:', location); // Debugging log
        setUserAddress(location.address || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };
  
    fetchUserLocation(); // Get user location when component mounts
  }, [fetchCategoryItems]);

  return (
    <div className="Category-items-container">
      <h1 className="Category-items-title">Items in {category_name}</h1>
      {userAddress && (
      <p className="user-address">
        {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
      </p>
        )}{/* Display user's address */}
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <Card sx={{ maxWidth: 345, margin: '20px' }} key={item.Item_id} className="category-items-card">
              <CardActionArea>
                <CardMedia
                    component="img"
                    className="item-image"
                    height="140"
                    image={item.Image_url}
                    alt={item.Item_name}
                />
                <CardContent>
                  <h3 className="item-header">{item.Item_name}</h3>
                  <div className="rating-container">
                    <StarIcon className="star-icon" alt="star-icon" />
                    <p className="renter-rating"> {item.Rating}</p> {/* Add rating instead */}
                  </div>
                  <p className="item-price">Price: ${item.Price_per_day} per day</p>
                  {/* <img src={item.Image_url} alt={item.Item_name} /> */}
                </CardContent>
              </CardActionArea>
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
