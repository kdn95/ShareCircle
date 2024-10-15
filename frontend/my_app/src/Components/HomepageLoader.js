import React from 'react';
import '../index.css'; // Create this CSS file for styling

const HomepageLoader = () => {
  return (
    <div className="logo-loader">
      <h2 className="slogan">Rent, Share, Repeat.</h2>
      {/* <p className="catch-phrase">Share Circle is a platform for renting and sharing items within your local community. Find what you need or offer what you have with ease, all while saving time and reducing waste.</p> */}
      <img 
        src={`${process.env.PUBLIC_URL}/sharecirclelogo.png`} 
        alt="Loading..." 
        className="loader-image" 
      />
    </div>
  );
};

export default HomepageLoader;
