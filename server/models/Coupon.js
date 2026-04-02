const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['percent', 'fixed'],
    default: 'percent'
  },
  discount: {
    type: Number,
    required: [true, 'Discount value is required'],
    min: 0
  },
  minOrder: {
    type: Number,
    default: 0
  },
  maxUses: {
    type: Number,
    default: 100
  },
  usedCount: {
    type: Number,
    default: 0
  },
  usedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  expiresAt: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);
