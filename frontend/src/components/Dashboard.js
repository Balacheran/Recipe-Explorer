import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { AuthContext } from '../AuthContext';
import RecipeSlider from './RecipeSlider';
import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      console.log(response.data); // Log the response to verify data
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const results = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(results);
  }, [searchQuery, recipes]);

  const handleProfileClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    logout();
    setMenuVisible(false);
  };

  const handleAddRecipe = () => {
    navigate('/add-recipe'); // Navigate to the AddRecipePage
  };

  const navigateHome = () => {
    navigate('/dashboard'); // Navigate to /dashboard
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo">
            <img className="nav-logo" src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626575/cheeseburger_2_rk66mk.png" alt="Logo" />
            Food Recipe
          </div>
        </div>
        <div className="navbar-buttons">
          <button className="home-button" onClick={navigateHome}>Home</button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search recipe"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img
              className="nav-logo profile-icon"
              src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626577/Male_User_dcqg05.png"
              alt="profile"
              onClick={handleProfileClick}
            />
            {menuVisible && (
              <div className="profile-menu">
                <button onClick={handleAddRecipe}>Add Recipe</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className="main-content">
        <>
          <div className="banner">
            <div className="banner-content">
              <h2>Recipe of the day</h2>
              <h1 style={{ color: '#FFA600' }}>Vegetable Sizzler</h1>
              <p>
                Sizzlers are a favorite with Indians, as they come with sizzler plates, with tikkis, rice,
                stir-fried vegetables, French fries, and tasty barbecue sauce.
              </p>
              <button>
                Get Recipe
                <img
                  style={{ paddingLeft: '10px', width: '12px', height: '12px' }}
                  src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626577/soft-white-right-arrow-icon-26_weihow.png"
                  alt="Arrow"
                />
              </button>
            </div>
            <div className="banner-image">
              {/* <img src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626575/bowl-rainbow-salad-with-black-background_111797_xoxbzu.jpg" alt="Vegetable Sizzler" /> */}
            </div>
          </div>
          <div className="popular-recipes">
            <h2 style={{ color: '#FFA600' }}>Popular Recipes</h2>
            {filteredRecipes.length === 0 ? (
              <p>No recipes found</p>
            ) : filteredRecipes.length > 5 ? (
              <RecipeSlider recipes={filteredRecipes} />
            ) : (
              <div className="recipe-list">
                {filteredRecipes.map((recipe, index) => (
                  <RecipeCard recipe={recipe} key={index} />
                ))}
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Dashboard;
