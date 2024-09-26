import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import '../index.css'; // Assuming your custom CSS is here

const Categories = () => {
  // State to hold categories data
  const [categories, setCategories] = useState([]);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5007/'); // Adjust the endpoint accordingly
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
    <div className="categories-container">
      {/* Iterate over categories and display each one in a Card */}
      {categories.map((category) => (
        <Card sx={{ maxWidth: 345, margin: '20px' }} key={category.ID}> {/* Unique key */}
          <CardActionArea>
            {/* Display the category image */}
            <CardMedia
              component="img"
              height="140"
              image={category.ImageUrl || '/static/images/cards/default.jpg'} // Fallback image if none is available
              alt={category.Name} // Alt text for the image
            />
            <CardContent>
              {/* Category Name */}
              <h3>{category.Name}</h3>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default Categories;
