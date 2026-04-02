const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    ar: { type: String, required: [true, 'Arabic name is required'], trim: true },
    en: { type: String, required: [true, 'English name is required'], trim: true }
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true
  },
  description: {
    ar: { type: String, required: [true, 'Arabic description is required'] },
    en: { type: String, required: [true, 'English description is required'] }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  priceAfterDiscount: {
    type: Number,
    default: 0
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  images: [{
    type: String
  }],
  thumbnail: {
    type: String,
    default: ''
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  brand: {
    ar: { type: String, default: '' },
    en: { type: String, default: '' }
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  tags: [String],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id'
});

// Index for search
productSchema.index({ 'name.ar': 'text', 'name.en': 'text', 'description.ar': 'text', 'description.en': 'text' });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });
productSchema.index({ ratingsAverage: -1 });

module.exports = mongoose.model('Product', productSchema);
