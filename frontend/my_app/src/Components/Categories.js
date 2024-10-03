import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import '../index.css'; // Assuming your custom CSS is here

const Categories = () => {
  // State to hold categories data
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://project-sc.onrender.com/'); // Adjust the endpoint accordingly
      setCategories(response.data); // Set the categories data
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array ensures this only runs once

  return (
    <>
    <h1 className="categories-title">Categories</h1>
    <div className="categories-container">
      {categories.map((category) => (
        <Card sx={{ flex: '0 0 calc(50% - 1rem)', margin: '0.5rem' }} key={category.ID} className="category-card">
          <CardActionArea>
            <Link to={`/category/${category.Name}`} className="no-undies">
              <CardMedia
                component="img"
                className="category-image"
                height="140"
                image={category.Category_pic}
                alt={category.Name}
              />
              <CardContent>
                <h3>{category.Name}</h3>
              </CardContent>
            </Link>
          </CardActionArea>
      </Card>
      ))}
    </div>
    </>
  );
};

export default Categories;
