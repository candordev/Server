const Message = require('../models/messagesModel');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// validate recipient
const isValidRecipient = async (recipientId) => { //move this too the messagesModel
    try {
      const recipient = await User.findById(recipientId);
      if (!recipient) {
        return false; // recipient does not exist
      }
      // add additional checks here for recipient permissions or other criteria
      return true;
    } catch (error) {
      throw new Error(`Error validating recipient: ${error}`);
    }
  };
  

// create a message
const createMessage = async (req, res) => {
  const { sender, recipient, content } = req.body;

  try {
    const userData = { sender, recipient, content }
    

    if (!await isValidRecipient(recipient)) { // move this to the messagesModel
      return res.status(400).json({ error: 'Invalid recipient' });
    }

    const message = await Message.createM(userData)
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get message by ID
const getMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findById(id);
    if (message) {
      res.status(200).json({ message });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update message by ID
const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const message = await Message.findByIdAndUpdate(id, { text }, { new: true });
    if (message) {
      res.status(200).json({ message });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// delete message by ID
const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Message.findByIdAndDelete(id);
    if (message) {
      res.status(200).json({ message });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage
};
