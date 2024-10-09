import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const message = query.get('message');

  return (
    <div>
      <h1>{message ? message : 'Payment Completed!'}</h1>
      {/* Additional content can go here */}
    </div>
  );
};

export default SuccessPage;
