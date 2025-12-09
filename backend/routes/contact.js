const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { fullName, email, mobileNumber, city } = req.body;

    if (!fullName || !email || !mobileNumber || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const contact = new Contact({
      fullName,
      email,
      mobileNumber,
      city
    });

    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully', contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all contact form submissions (protected route)
router.get('/', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
