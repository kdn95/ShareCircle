import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { format } from 'date-fns'; // Import date-fns for formatting dates

const SuccessPage = () => {
  const [message, setMessage] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [renterName, setRenterName] = useState('');
  const [itemPhoto, setItemPhoto] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Retrieve values from localStorage
    const paymentMessage = localStorage.getItem('paymentMessage');
    const storedItemName = localStorage.getItem('paymentItemName');
    const storedItemPrice = localStorage.getItem('paymentItemPrice');
    const storedRenterName = localStorage.getItem('paymentRenterName');
    const storedItemPhoto = localStorage.getItem('paymentItemPhoto');
    const storedStartDate = localStorage.getItem('paymentStartDate');
    const storedEndDate = localStorage.getItem('paymentEndDate');

    // Update state based on retrieved values
    if (paymentMessage) {
      setMessage(paymentMessage);
      localStorage.removeItem('paymentMessage'); // Clear the message after displaying it
    }
    if (storedItemName) {
      setItemName(storedItemName);
    }
    if (storedItemPrice) {
      setItemPrice(storedItemPrice);
    }
    if (storedRenterName) {
      setRenterName(storedRenterName);
    }
    if (storedItemPhoto) {
      setItemPhoto(storedItemPhoto);
    }
    if (storedStartDate) {
      setStartDate(format(new Date(storedStartDate), 'dd MMMM yyyy')); // Format the start date
    }
    if (storedEndDate) {
      setEndDate(format(new Date(storedEndDate), 'dd MMMM yyyy')); // Format the end date
    }

    // Clear localStorage items after using them
    localStorage.removeItem('paymentItemName');
    localStorage.removeItem('paymentItemPrice');
    localStorage.removeItem('paymentRenterName');
    localStorage.removeItem('paymentItemPhoto');
    localStorage.removeItem('paymentStartDate');
    localStorage.removeItem('paymentEndDate');
  }, []);

  return (
    <div className="Success-page">
      <Card className="card">
        {itemPhoto && (
          <CardMedia
            className="card-media"
            component="img"
            alt="Item"
            image={itemPhoto}
          />
        )}
        <CardContent className="card-content">
          {message && (
            <Typography variant="h5" component="div" className="success">
              Payment Successful!
            </Typography>
          )}
          {itemName && (
            <Typography variant="h6" component="div">
              Rented Item: {itemName}
            </Typography>
          )}
          {startDate && endDate && (
            <div>
            <Typography variant="body1" color="text.secondary">
              Rental Period:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {startDate} - {endDate}
            </Typography>
            </div>
              )}
          {renterName && (
            <Typography variant="body1" color="text.secondary">
              Rented from: {renterName}
            </Typography>
          )}
          {itemPrice && (
            <Typography variant="h6" className="color-primary">
              Total: ${itemPrice}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;