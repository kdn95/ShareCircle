// import axios from 'axios';

// location.js
const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }
    
    const data = await response.json();

   // Extract specific address components
   const address = {
    street: data.address.road || 'N/A',
    city: data.address.city || data.address.town || data.address.village || 'N/A',
    state: data.address.state || 'N/A',
    postcode: data.address.postcode || 'N/A'
  };


  return address; // Return the extracted address components
} catch (error) {
  console.error('Error fetching address:', error);
  return null;
}
};

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await getAddressFromCoordinates(latitude, longitude);
          resolve({ latitude, longitude, address }); // Return coordinates and address
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

export { getUserLocation };