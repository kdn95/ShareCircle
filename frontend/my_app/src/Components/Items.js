import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For fetching route parameters
import axios from 'axios'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import '../index.css'; // Assuming your custom CSS is here

const ItemsListing = () => {
  const { category_name, itemId } = useParams(); // Get category name and itemId from the URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5008/${category_name}/${itemId}`);
        setItem(response.data); // Set item data
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [category_name, itemId]);

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <div className="item-details-container">
      <Card sx={{ maxWidth: 345, margin: '20px' }} className="item-details-card">
        <CardMedia
          component="img"
          height="140"
          image={item.Image_url}
          alt={item.Item_name}
        />
        <CardContent>
          <h2>{item.Item_name}</h2>
          <p><b>Rented by:</b> {item.Renter_name}</p>
          <div className="rating-container">
            <StarIcon className="star-icon" alt="star-icon" />
            <p>{item.Rating}</p> {/* Renter's rating */}
          </div>
          <p><b>Price per day:</b> ${item.Price_per_day}</p>
          <p><b>Availability:</b> {item.Availability ? 'Available' : 'Not Available'}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItemsListing;