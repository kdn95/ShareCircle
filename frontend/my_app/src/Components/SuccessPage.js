import React, { useEffect, useState } from 'react';
import '../index.css';

const SuccessPage = () => {
  const [message, setMessage] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [renterName, setRenterName] = useState('');
  const [itemPhoto, setItemPhoto] = useState('');

  useEffect(() => {
    const paymentMessage = localStorage.getItem('paymentMessage');
    const storedItemName = localStorage.getItem('paymentItemName');
    const storedItemPrice = localStorage.getItem('paymentItemPrice');
    const storedRenterName = localStorage.getItem('paymentRenterName');
    const storedItemPhoto = localStorage.getItem('paymentItemPhoto');

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

    // Optionally, clear the localStorage after using the values
    localStorage.removeItem('paymentItemName');
    localStorage.removeItem('paymentItemPrice');
    localStorage.removeItem('paymentRenterName');
    localStorage.removeItem('paymentItemPhoto');
    localStorage.removeItem('paymentMessage');
  }, []);

  return (
    <div className="Success-page">
      {itemPhoto && <img src={itemPhoto} alt="Item" style={{ width: '300px', height: 'auto' }} />}
      {message && <h2>Payment Successful!</h2>}
      {itemName && <h2>Rented Item: {itemName}</h2>}
      {renterName && <h3>Rented from: {renterName}</h3>}
      {itemPrice && <h2>Total: ${itemPrice}</h2>}
    </div>
  );
};

export default SuccessPage;
