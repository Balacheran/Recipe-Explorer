// RecipeCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleGetRecipe = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  return (
    <div className="recipe-card">
      <div className="image-container">
        <img 
          src={`http://localhost:5000/images/${recipe.coverImage}`} 
          alt={recipe.title} 
          className="recipe-image"
        />
      </div>
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p>Duration: {recipe.time}</p>
        <p>Rating: {recipe.rating}</p>
        <p className="description">{recipe.description}</p>
        <button onClick={handleGetRecipe}>Get Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCard;