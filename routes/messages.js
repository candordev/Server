const express = require('express');
const jwt = require('jsonwebtoken');
const {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} = require('../controllers/messagesController');

const router = express.Router();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err){
        console.log('Error: ', err.message);
        return res.sendStatus(403);
    }else{
        console.log(' THIS WORKS');
    }
    req.user = user;
    next();
  });
};

// Create a message
router.post('/', authenticateToken, createMessage);

// Get all messages
router.get('/', authenticateToken, getMessages);

// Get a message by ID
router.get('/:id', authenticateToken, getMessageById);

// Update a message by ID
router.put('/:id', authenticateToken, updateMessage);

// Delete a message by ID
router.delete('/:id', authenticateToken, deleteMessage);

module.exports = router;
