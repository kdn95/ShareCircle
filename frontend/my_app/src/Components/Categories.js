// Categories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5003/');
      setCategories(response.data); // Set fetched categories to state
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  return (
    <>
    <div className="categories-container">
      {categories.map((category) => (
        <div className="category-card" key={category.ID}>
          {/* <img src={category.imageUrl} alt={category.Name} /> */}
          <h3>{category.Name}</h3> {/* Adjust the property based on your category structure */}
        </div>
      ))}
    </div>
    </>
  );
};

export default Categories;
