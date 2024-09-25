import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5003/')  // Make sure the URL matches your backend
      .then(response => {
        setCategories(response.data);  // Assuming response.data is an array of categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="categories">
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.ID}>{category.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
