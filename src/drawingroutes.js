const express = require('express');
const Drawing = require('./drawingModel');
const router = express.Router();
const verifyToken = require('./middleware');

// Save board state
router.post('/save', verifyToken, async (req, res) => {
  const { boardState } = req.body;
  const drawing = new Drawing({ userId: req.user.id, boardState });

  try {
    await drawing.save();
    res.status(201).json({ message: 'Drawing saved successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error saving drawing', error });
  }
});

// Get saved drawings for a user
router.get('/', verifyToken, async (req, res) => {
  try {
    const drawings = await Drawing.find({ userId: req.user.id });
    res.json(drawings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drawings', error });
  }
});

module.exports = router;
