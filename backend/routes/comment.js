const express = require('express');
const router = express.Router();
const { addComment, getComments } = require('../controller/comment');
const verifyToken = require('../middleware/auth');

router.post('/recipes/:recipeId/comments', verifyToken, addComment);
router.get('/recipes/:recipeId/comments', getComments);

module.exports = router;