import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import to access the category name from the URL
import axios from 'axios';

const CategoryItems = () => {
  const { category_name } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);

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
  }, [category_name]); // Re-fetch if category_name changes

  return (
    <div>
      <h1>Items in {category_name}</h1>
      <div className="items-container">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.Item_id}>
              <h3>{item.Item_name}</h3>
              <p>{item.Description}</p>
              <p>Price: ${item.Price_per_day} per day</p>
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
