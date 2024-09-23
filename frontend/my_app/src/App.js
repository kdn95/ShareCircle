import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [categories, setCategories] = useState([]);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    axios.get('http://localhost:5003/') // GET request to backend api endpoint
      .then((response) => {
        setCategories(response.data);  // Assuming response.data is an array of categories
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.category_name}</li>  // Adjust based on your table's column names
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
