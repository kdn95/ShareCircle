import React, { useEffect, useState } from 'react';

const SuccessPage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const paymentMessage = localStorage.getItem('paymentMessage');
    if (paymentMessage) {
      setMessage(paymentMessage);
      localStorage.removeItem('paymentMessage'); // Clear the message after displaying it
    }
  }, []);

  return (
    <div>
      {/* <h1>{message || 'This comes from the SuccessPage!'}</h1> */}
      {message && <h2>This comes from the SuccessPage!</h2>}
    </div>
  );
};

export default SuccessPage;
