import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ItemDetail.css';

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        coverImage: '',
        time: '',
        chef: '',
        type: '',
        rating: '',
        ingredients: [], // Initialize as empty array
        instructions: [], // Initialize as empty array
        comments: []
    });
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({
        email: '',
        name: '',
        rating: 0,
        text: ''
    });

    // Use useCallback to memoize the fetchRecipe function
    const fetchRecipe = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/recipes/${id}`);
            setRecipe(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            toast.error('Error loading recipe');
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]); // Now fetchRecipe is a dependency

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to comment');
                navigate('/signin');
                return;
            }

            await axios.post(
                `http://localhost:5000/recipes/${id}/comments`,
                newComment,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            toast.success('Comment added successfully');
            setNewComment({ email: '', name: '', rating: 0, text: '' });
            fetchRecipe(); // Refresh recipe data to show new comment
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment');
        }
    };
    
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-recipe-orange text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="detail-page">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <img 
                            className="nav-logo" 
                            src="https://res.cloudinary.com/djs1us6h2/image/upload/v1735626575/cheeseburger_2_rk66mk.png" 
                            alt="Logo" 
                        />
                        <span>Food Recipe</span>
                    </div>
                    <div className="search-container">
                        <input 
                            type="search" 
                            placeholder="Search recipe" 
                            className="search-input"
                        />
                    </div>
                    <div className="profile-icon">👤</div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-overlay"></div>
                <img 
                    src={`http://localhost:5000/images/${recipe.coverImage}`}
                    alt={recipe.title} 
                    className="hero-image"
                />
                <div className="hero-content">
                    <h1>{recipe.title}</h1>
                    <div className="recipe-meta">
                        <span>⏱ Duration: {recipe.time}</span>
                        <span>👨‍🍳 Chef: {recipe.chef}</span>
                        <span>🍖 {recipe.type}</span>
                        <span>⭐ {recipe.rating}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Ingredients Section */}
            <div className="ingredients-section">
    <h2>Ingredients</h2>
    <div className="ingredients-list">
        {Array.isArray(recipe.ingredients) ? (
            // If ingredients is an array
            recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                    <span>{ingredient}</span>
                </div>
            ))
        ) : (
            // If ingredients is a string
            recipe.ingredients?.split(',').map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                    <span>{ingredient.trim()}</span>
                </div>
            ))
        )}
    </div>
</div>

// Similarly for instructions
<div className="directions-section">
    <h2>Directions</h2>
    <div className="directions-list">
        {Array.isArray(recipe.instructions) ? (
            // If instructions is an array
            recipe.instructions.map((step, index) => (
                <div key={index} className="direction-item">
                    <div className="direction-header">
                        <h3>Step {index + 1}</h3>
                        <span>▼</span>
                    </div>
                    <p>{step}</p>
                </div>
            ))
        ) : (
            // If instructions is a string
            recipe.instructions?.split('.').filter(step => step.trim()).map((step, index) => (
                <div key={index} className="direction-item">
                    <div className="direction-header">
                        <h3>Step {index + 1}</h3>
                        <span>▼</span>
                    </div>
                    <p>{step.trim()}</p>
                </div>
            ))
        )}
    </div>
</div>

                {/* Comments Section */}
                <div className="comments-section">
                    <h2>Cooked this? Comment and rate the recipe</h2>
                    
                    {/* Comment Form */}
                    <div className="comment-form">
                        <form onSubmit={handleCommentSubmit}>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={newComment.email}
                                onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                            />
                            <input 
                                type="text" 
                                placeholder="Name" 
                                value={newComment.name}
                                onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                            />
                            
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span 
                                        key={star} 
                                        onClick={() => setNewComment({...newComment, rating: star})}
                                        className="star-icon"
                                    >
                                        {star <= newComment.rating ? '⭐' : '☆'}
                                    </span>
                                ))}
                            </div>
                            
                            <textarea 
                                placeholder="Your comment" 
                                rows="4"
                                value={newComment.text}
                                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                            ></textarea>
                            
                            <button type="submit">
                                Submit Comment
                            </button>
                        </form>
                    </div>

                    {/* Comments List */}
                    <div className="comments-list">
                        {recipe.comments?.map((comment, index) => (
                            <div key={index} className="comment-item">
                                <div className="comment-rating">
                                    ⭐ {comment.rating}
                                </div>
                                <h4>{comment.name}</h4>
                                <p>{comment.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;