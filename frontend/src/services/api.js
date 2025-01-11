// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const recipeService = {
    getAllRecipes: () => api.get('/recipes'),
    getRecipe: (id) => api.get(`/recipes/${id}`),
    addRecipe: (formData) => api.post('/recipes', formData),
    updateRecipe: (id, formData) => api.put(`/recipes/${id}`, formData),
    deleteRecipe: (id) => api.delete(`/recipes/${id}`),
    addComment: (recipeId, comment) => api.post(`/recipes/${recipeId}/comments`, comment),
    getComments: (recipeId) => api.get(`/recipes/${recipeId}/comments`)
};

export const authService = {
    login: (credentials) => api.post('/login', credentials),
    signup: (userData) => api.post('/signUp', userData),
    getUser: (id) => api.get(`/user/${id}`)
};