const express = require('express');
const router = express.Router();
const AuthService = require('../services/authService');

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await AuthService.login(req.db, email, password);
    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
