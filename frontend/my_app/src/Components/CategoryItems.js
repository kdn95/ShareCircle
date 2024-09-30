import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import StarIcon from '@mui/icons-material/Star';
import '../index.css'; // Assuming your custom CSS is here

const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [userAddress, setUserAddress] = useState({});

  const fetchCategoryItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5007/${category_name}`); // Fetch items by category
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

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
  }, [category_name]);

  return (
    <div className="Category-items-container">
      <h1 className="Category-items-title">Items in {category_name}</h1>
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.Item_id}>
              <h3>{item.Item_name}</h3>
              <p>{item.Description}</p>
              <p>Price: ${item.Price_per_day} per day</p>
              <img src={item.Image_url} alt={item.Item_name} />
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
