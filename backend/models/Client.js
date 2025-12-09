const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  cloudinaryPublicId: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);
