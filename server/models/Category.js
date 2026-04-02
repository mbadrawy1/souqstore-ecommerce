const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    ar: { type: String, required: true, trim: true },
    en: { type: String, required: true, trim: true }
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📦'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
