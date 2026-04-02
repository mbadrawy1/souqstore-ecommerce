const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { ar: String, en: String },
    price: Number,
    quantity: { type: Number, required: true, min: 1 },
    image: String
  }],
  shippingAddress: {
    details: String,
    city: String,
    postalCode: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'wallet'],
    default: 'cash'
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: {
    type: Number,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    default: 0.0
  },
  coupon: {
    type: String,
    default: ''
  },
  discount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: Date,
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
