import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import './RecipeSlider.css';

const RecipeSlider = ({ recipes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;

  const handleScrollLeft = () => {
    setStartIndex((prevStartIndex) =>
      prevStartIndex === 0 ? recipes.length - visibleCount : prevStartIndex - 1
    );
  };

  const handleScrollRight = () => {
    setStartIndex((prevStartIndex) =>
      (prevStartIndex + 1) % recipes.length
    );
  };

  const visibleRecipes = recipes.slice(startIndex, startIndex + visibleCount).concat(
    recipes.slice(0, Math.max(0, startIndex + visibleCount - recipes.length))
  );

  return (
    <div className="recipe-slider-container">
      <button className="arrow left-arrow" onClick={handleScrollLeft}>&#10094;</button>
      <div className="recipe-slider">
        {visibleRecipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </div>
      <button className="arrow right-arrow" onClick={handleScrollRight}>&#10095;</button>
    </div>
  );
};

export default RecipeSlider;
