import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import LogoLoader from './LogoLoader';
import Calendar from './Calendar';
import format from 'date-fns/format';
import '../index.css';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const ItemsListing = () => {
  const { category_name, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [confirmedDates, setConfirmedDates] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5005/${category_name}/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [category_name, itemId]);

  if (loading) {
    return <LogoLoader />;
  }

  if (!item) {
    return <p>No item found.</p>;
  }

  const handleRentNowClick = () => {
    setShowCalendar(true);
  };

  const handleConfirmDates = (dates) => {
    setConfirmedDates(dates);
    setShowCalendar(false);
  };

  const handleProceedToPayment = async () => {
    if (!confirmedDates) return;

    try {
        const stripe = await stripePromise; // Load Stripe.js
        const response = await axios.post('http://localhost:5005/create-checkout-session', {
            amount: Math.round(item.Price_per_day * (confirmedDates.endDate - confirmedDates.startDate) / (1000 * 60 * 60 * 24)), // Calculate total amount
            category: item.Category_id, // Send the category
        });

        const { id } = response.data; // Get the session ID from the response

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: id });

        if (result.error) {
            console.error(result.error.message);
            // Handle any error that occurs during redirection
        }
    } catch (error) {
        console.error('Error creating checkout session:', error.response?.data || error.message);
    }
};


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
                src={item.Profile_pic}
                alt="Renter Profile"
                className="renter-profile-pic"
              />
              <div className="renter-details">
                <p className="renter-full-name">{item.Renter_name} {item.Last_name}</p>
                <div className="rating-container">
                  <p className="renter-rating">{item.Rating}</p>
                  <StarIcon className="star-icon" alt="star-icon" />
                </div>
              </div>
              <ChatIcon className="chat-icon" alt="chat" />
            </div>
          </div>
          <div className="rent-button-container">
            <button className="rent-button" onClick={handleRentNowClick}>Rent Now</button>
          </div>
          {showCalendar && <Calendar onConfirmDates={handleConfirmDates} />}
        </CardContent>
      </Card>
      {confirmedDates && (
        <div className="confirmed-dates">
          <h4 className="dates-title">Confirmed Dates:</h4>
          <p className="date-range">{format(confirmedDates.startDate, 'dd/MM/yyyy')} - {format(confirmedDates.endDate, 'dd/MM/yyyy')}</p>
          <button className="proceed-button" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemsListing;
