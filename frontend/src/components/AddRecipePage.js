// AddRecipePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddRecipePage.css';

const AddRecipePage = () => {
  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    time: '',
    rating: '',
    description: '',
    chef: '',
    type: 'Vegetarian', // Default value
    file: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRecipeData(prev => ({
      ...prev,
      file: file
    }));

    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      Object.keys(recipeData).forEach(key => {
        formData.append(key, recipeData[key]);
      });

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add a recipe');
        navigate('/signin');
        return;
      }

      await axios.post('http://localhost:5000/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success('Recipe added successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error(error.response?.data?.message || 'Failed to add recipe');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo">
            <img 
              className="nav-logo" 
              src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626575/cheeseburger_2_rk66mk.png" 
              alt="Logo" 
            />
            <span>Food Recipe</span>
          </div>
        </div>
        <div className="navbar-buttons">
          <button className="home-button" onClick={() => navigate('/dashboard')}>
            Home
          </button>
        </div>
      </nav>

      <div className="add-recipe-container">
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-grid">
            <div className="form-left">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={recipeData.title}
                  onChange={handleInputChange}
                  placeholder="Recipe title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Chef Name</label>
                <input
                  type="text"
                  name="chef"
                  value={recipeData.chef}
                  onChange={handleInputChange}
                  placeholder="Chef name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={recipeData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-veg">Non-veg</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cooking Time</label>
                <input
                  type="text"
                  name="time"
                  value={recipeData.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 1h 30m"
                  required
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={recipeData.rating}
                  onChange={handleInputChange}
                  placeholder="Rating (1-5)"
                  required
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={recipeData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the recipe"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Ingredients</label>
                <textarea
                  name="ingredients"
                  value={recipeData.ingredients}
                  onChange={handleInputChange}
                  placeholder="Enter ingredients (comma separated)"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Instructions</label>
                <textarea
                  name="instructions"
                  value={recipeData.instructions}
                  onChange={handleInputChange}
                  placeholder="Enter cooking instructions"
                  rows="6"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="image-upload-section">
            <div className="form-group">
              <label>Recipe Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Recipe preview" />
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipePage;