const Comment = require('../models/comment');
const Recipe = require('../models/recipe');

const addComment = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { name, email, rating, text } = req.body;

        const newComment = await Comment.create({
            recipeId,
            name,
            email,
            rating,
            text
        });

        // Update recipe with new comment
        await Recipe.findByIdAndUpdate(
            recipeId,
            { $push: { comments: newComment._id } }
        );

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
};

module.exports = { addComment, getComments };