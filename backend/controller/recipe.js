const Recipes = require('../models/recipe');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // Save images in the public/images directory
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    if (recipes.length === 0) {
      return res.status(200).json({ message: "No recipes found" });
    }
    return res.json(recipes);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getRecipe = async (req, res) => {
  try {
      const recipe = await Recipes.findById(req.params.id)
          .populate({
              path: 'comments',
              options: { sort: { 'createdAt': -1 } }
          });
      
      if (!recipe) {
          return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
  } catch (error) {
      return res.status(500).json({ message: "Server error" });
  }
};
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, rating, description } = req.body;

  if (!title || !ingredients || !instructions || !rating || !description) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients: ingredients.split(',').map(item => item.trim()), // Adjust for Array input
      instructions,
      time,
      rating,
      description,
      coverImage: req.file.filename,
      createdBy: req.user.id,
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, rating, description } = req.body;
  try {
    let recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage;
    await Recipes.findByIdAndUpdate(req.params.id, { ...req.body, ingredients: ingredients.split(',').map(item => item.trim()), coverImage }, { new: true });
    res.json({ title, ingredients, instructions, time, rating, description });
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: 'ok' });
  } catch (err) {
    return res.status(400).json({ message: 'error' });
  }
};


module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };
