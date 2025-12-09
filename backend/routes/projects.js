const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');

// Configure multer memory storage
const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Get all projects (public route)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new project (protected route)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    // Upload to Cloudinary with cropping
    const result = await uploadBufferToCloudinary(req.file.buffer, 'platform-images');

    const project = new Project({
      name,
      description,
      image: result.secure_url,
      cloudinaryPublicId: result.public_id
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project (protected route)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Delete from Cloudinary if public_id exists
    if (project.cloudinaryPublicId) {
      try {
        await deleteFromCloudinary(project.cloudinaryPublicId);
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
