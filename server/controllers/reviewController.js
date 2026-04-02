const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');

const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
  res.json({ success: true, reviews });
});

const createReview = asyncHandler(async (req, res) => {
  req.body.user = req.user._id;
  req.body.product = req.params.productId;

  const existing = await Review.findOne({ user: req.user._id, product: req.params.productId });
  if (existing) { res.status(400); throw new Error('Already reviewed this product'); }

  const review = await Review.create(req.body);
  res.status(201).json({ success: true, review });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) { res.status(404); throw new Error('Review not found'); }
  if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403); throw new Error('Not authorized');
  }
  await Review.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Review removed' });
});

const likeReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) { res.status(404); throw new Error('Review not found'); }

  const idx = review.likes.indexOf(req.user._id);
  if (idx > -1) {
    review.likes.splice(idx, 1);
  } else {
    review.likes.push(req.user._id);
  }
  await review.save();
  res.json({ success: true, likes: review.likes.length });
});

module.exports = { getProductReviews, createReview, deleteReview, likeReview };
