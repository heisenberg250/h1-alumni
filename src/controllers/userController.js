const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserService = require('../services/userService');

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, batch, phoneNumber, whatsappNumber, email, occupation, suggestion, remarks, activeAreas, joiningCommittee, referral, password, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserService.registerUser(req.db, name, batch, phoneNumber, whatsappNumber, email, occupation, suggestion, remarks, activeAreas, joiningCommittee, referral, hashedPassword, address);

    if (!user) {
      res.status(201).json({ message: 'Email Already Registered' });
    };

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
