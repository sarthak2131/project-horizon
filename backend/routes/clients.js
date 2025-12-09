const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');

// Configure multer memory storage
const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get all clients (public route)
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new client (protected route)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    console.log('\n🔷 New client upload request received');
    
    if (!req.file) {
      console.log('❌ No file in request');
      return res.status(400).json({ error: 'Image is required' });
    }

    console.log('📁 File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    const { name, designation, description } = req.body;

    if (!name || !designation || !description) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Name, designation, and description are required' });
    }

    console.log('📝 Client details:', { name, designation, description });

    // Upload to Cloudinary with cropping
    console.log('⏳ Uploading to Cloudinary...');
    const result = await uploadBufferToCloudinary(req.file.buffer, 'platform-images/clients');

    const client = new Client({
      name,
      designation,
      description,
      image: result.secure_url,
      cloudinaryPublicId: result.public_id
    });

    await client.save();
    console.log('✅ Client saved successfully:', client._id);
    res.status(201).json(client);
  } catch (error) {
    console.error('❌ Error creating client:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Delete client (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Delete from Cloudinary if public_id exists
    if (client.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(client.cloudinaryPublicId);
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
      }
    }

    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
