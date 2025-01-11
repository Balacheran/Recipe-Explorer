const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    chef: {
        type: String,
        default: 'Unknown'
    },
    type: {
        type: String,
        default: 'General'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Recipes', recipeSchema);