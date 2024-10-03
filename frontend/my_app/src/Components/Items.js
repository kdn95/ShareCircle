import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For fetching route parameters
import axios from 'axios'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import LogoLoader from './LogoLoader'; // Import your LogoLoader component
import '../index.css'; // Assuming your custom CSS is here

const ItemsListing = () => {
  const { category_name, itemId } = useParams(); // Get category name and itemId from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(`http://localhost:5006/${category_name}/${itemId}`);
        setItem(response.data); // Set item data
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchItemDetails();
  }, [category_name, itemId]);

  if (loading) {
    return <LogoLoader />; // Show loader while loading
  }

  if (!item) {
    return <p>No item found.</p>; // Handle case where item is not found
  }

  return (
    <div className="item-details-container">
      <Card sx={{ maxWidth: 400, margin: '20px' }} className="item-details-card">
        <CardMedia
          component="img"
          className="item-image"
          height="140"
          image={item.Image_url}
          alt={item.Item_name}
        />
        <CardContent>
          <div className="item-header-container">
            <h2 className="item-name">{item.Item_name}</h2>
            <p className="item-price">${item.Price_per_day} per day</p>
          </div>
          <div className="description-availability-container">
            <p className="item-description">{item.Description}</p>
            <p className="item-availability">{item.Availability ? 'Available now' : 'Not Available'}</p>
          </div>
          <div className="renter-container">
            <div className="renter-info">
              <img
                src={item.Profile_pic} // Use Profile_pic from item data
                alt="Renter Profile"
                className="renter-profile-pic" // Class for styling
              />
              <div className="renter-details">
                <p className="renter-full-name">{item.Renter_name} {item.Last_name}</p>
                <div className="rating-container">
                  <p className="renter-rating">{item.Rating}</p> {/* Renter's rating */}
                  <StarIcon className="star-icon" alt="star-icon" />
                </div>
              </div>
              <ChatIcon className="chat-icon" alt="chat" />
            </div>
          </div>
          <div className="rent-button-container">
            <button className="rent-button">Rent Now</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemsListing;
