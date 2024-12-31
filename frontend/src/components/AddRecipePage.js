import React, { useState } from 'react';
import axios from 'axios';
import './AddRecipePage.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const AddRecipePage = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [time, setTime] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('time', time);
    formData.append('rating', rating);
    formData.append('description', description);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/recipes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
        },
      });
      toast.success('Recipe added successfully!'); // Show success toast notification
      setTimeout(() => {
        navigate('/dashboard'); // Navigate to the dashboard after a delay to allow the toast to be seen
      }, 2000);
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Failed to add recipe. Please try again.'); // Show error toast notification
    }
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
          <button className="home-button" onClick={() => navigate('/dashboard')}>Home</button>
        </div>
      </nav>
      <div className="add-recipe-page">
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Ingredients (comma-separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
          <input type="text" placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
          <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
          <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit">Add Recipe</button>
        </form>
        <ToastContainer /> {/* Include ToastContainer to render toasts */}
      </div>
    </div>
  );
};

export default AddRecipePage;
