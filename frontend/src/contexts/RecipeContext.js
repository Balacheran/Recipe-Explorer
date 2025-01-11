// contexts/RecipeContext.js
import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <RecipeContext.Provider value={{
            recipes,
            setRecipes,
            loading,
            setLoading,
            error,
            setError
        }}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipe = () => useContext(RecipeContext);