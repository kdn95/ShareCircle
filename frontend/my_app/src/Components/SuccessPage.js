import React, { useEffect, useState } from 'react';
import '../index.css';
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
    const paymentMessage = localStorage.getItem('paymentMessage');
    const storedItemName = localStorage.getItem('paymentItemName');
    const storedItemPrice = localStorage.getItem('paymentItemPrice');
    const storedRenterName = localStorage.getItem('paymentRenterName');
    const storedItemPhoto = localStorage.getItem('paymentItemPhoto');
    const storedStartDate = localStorage.getItem('paymentStartDate');
    const storedEndDate = localStorage.getItem('paymentEndDate');

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
      setEndDate(format(new Date(storedEndDate), 'dd MMMM yyyy'));     // Format the end date
    }

    // Optionally, clear the localStorage after using the values
    localStorage.removeItem('paymentItemName');
    localStorage.removeItem('paymentItemPrice');
    localStorage.removeItem('paymentRenterName');
    localStorage.removeItem('paymentItemPhoto');
    localStorage.removeItem('paymentStartDate');
    localStorage.removeItem('paymentEndDate');
    localStorage.removeItem('paymentMessage');
  }, []);

  return (
    <div className="Success-page">
      {itemPhoto && <img src={itemPhoto} alt="Item" style={{ width: '300px', height: 'auto' }} />}
      {message && <h1>Payment Successful!</h1>}
      {itemName && <h3>Rented Item: {itemName}</h3>}
      {startDate && endDate && (
        <div className="rental-period">
          <h3>Rental Period: {startDate} - {endDate}</h3>
        </div>
      )}
      {renterName && <h3>Rented from: {renterName}</h3>}
      {itemPrice && <h2>Total: ${itemPrice}</h2>}
    </div>
  );
};

export default SuccessPage;
