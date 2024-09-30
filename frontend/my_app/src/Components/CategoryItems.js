import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';
import { getUserLocation } from '../Location';

const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [userAddress, setUserAddress] = useState({});

  const fetchCategoryItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5008/${category_name}`); // Fetch items by category
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchCategoryItems();
    
    const fetchUserLocation = async () => {
      try {
        const location = await getUserLocation();
        console.log('User location:', location); // Debugging log
        setUserAddress(location.address || { street: 'Unknown', city: 'Unknown', state: 'Unknown', postcode: '' });
      } catch (error) {
        console.error('Error getting user location:', error);
      }
    };
  
    fetchUserLocation(); // Get user location when component mounts
  }, [category_name]);

  return (
    <div>
      <h1>Items in {category_name}</h1>
      {userAddress && (
        <p>
          {userAddress.street}, {userAddress.city}, {userAddress.state} {userAddress.postcode}
          </p>
        )}{/* Display user's address */}
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.Item_id}>
              <h3 className="item-header">{item.Item_name}</h3>
              <p className="item-description">{item.Description}</p>
              <p className="item-price">Price: ${item.Price_per_day} per day</p>
              <img src={item.Image_url} alt={item.Item_name} />
            </div>
          ))
        ) : (
          <p>No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryItems;
