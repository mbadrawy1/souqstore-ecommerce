const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, coupon, discount } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  let itemsPrice = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) { res.status(404); throw new Error(`Product not found`); }
    const price = product.priceAfterDiscount > 0 ? product.priceAfterDiscount : product.price;
    itemsPrice += price * item.quantity;
    item.price = price;
    item.name = product.name;
    item.image = product.thumbnail || (product.images[0] || '');
  }

  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const discountAmount = discount || 0;
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice - discountAmount).toFixed(2));

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    coupon: coupon || '',
    discount: discountAmount
  });

  // Update sold count
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { sold: item.quantity, stock: -item.quantity }
    });
  }

  res.status(201).json({ success: true, order });
});

// @desc    Get user orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// @desc    Get order by ID
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) { res.status(404); throw new Error('Order not found'); }
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403); throw new Error('Not authorized');
  }
  res.json({ success: true, order });
});

// @desc    Get all orders (admin)
const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  let filter = {};
  if (req.query.status) filter.status = req.query.status;

  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ success: true, orders, total, pages: Math.ceil(total / limit), currentPage: page });
});

// @desc    Update order status (admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Order not found'); }

  order.status = req.body.status || order.status;
  if (req.body.status === 'delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  if (req.body.isPaid) {
    order.isPaid = true;
    order.paidAt = Date.now();
  }

  const updated = await order.save();
  res.json({ success: true, order: updated });
});

// @desc    Get admin stats
const getAdminStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ]);

  const monthlyRevenue = await Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: { $month: '$createdAt' },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const statusBreakdown = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const topProducts = await Order.aggregate([
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.product',
        totalSold: { $sum: '$items.quantity' },
        revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 }
  ]);

  res.json({
    success: true,
    stats: {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue,
      statusBreakdown,
      topProducts
    }
  });
});

module.exports = { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus, getAdminStats };
