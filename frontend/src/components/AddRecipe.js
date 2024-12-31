import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = ({ onRecipeAdded }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [time, setTime] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

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
      await axios.post('http://localhost:5000/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onRecipeAdded();
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      <input type="text" placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} required />
      <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipe;
