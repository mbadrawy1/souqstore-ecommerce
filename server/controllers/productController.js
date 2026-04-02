const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const slugify = require('slugify');

// @desc    Get all products (with filtering, sorting, pagination)
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  // Build filter
  let filter = { isActive: true };

  if (req.query.category) filter.category = req.query.category;
  if (req.query.isFeatured) filter.isFeatured = req.query.isFeatured === 'true';

  // Price range
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  // Rating filter
  if (req.query.rating) {
    filter.ratingsAverage = { $gte: Number(req.query.rating) };
  }

  // Search
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filter.$or = [
      { 'name.ar': searchRegex },
      { 'name.en': searchRegex },
      { 'description.ar': searchRegex },
      { 'description.en': searchRegex }
    ];
  }

  // Sort
  let sort = {};
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'price-asc': sort = { price: 1 }; break;
      case 'price-desc': sort = { price: -1 }; break;
      case 'rating': sort = { ratingsAverage: -1 }; break;
      case 'newest': sort = { createdAt: -1 }; break;
      case 'bestselling': sort = { sold: -1 }; break;
      default: sort = { createdAt: -1 };
    }
  } else {
    sort = { createdAt: -1 };
  }

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate('category', 'name slug icon')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    count: products.length,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
    products
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name slug icon')
    .populate({ path: 'reviews', populate: { path: 'user', select: 'name avatar' } });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ success: true, product });
});

// @desc    Get related products
// @route   GET /api/products/:id/related
const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    isActive: true
  }).limit(8);

  res.json({ success: true, products: related });
});

// @desc    Create product (admin)
// @route   POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name.en, { lower: true });
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// @desc    Update product (admin)
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.name && req.body.name.en) {
    req.body.slug = slugify(req.body.name.en, { lower: true });
  }
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, product });
});

// @desc    Delete product (admin)
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, message: 'Product removed' });
});

// @desc    Get featured products
// @route   GET /api/products/featured
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true, isActive: true })
    .populate('category', 'name slug icon')
    .limit(8)
    .sort({ createdAt: -1 });
  res.json({ success: true, products });
});

module.exports = { getProducts, getProduct, getRelatedProducts, createProduct, updateProduct, deleteProduct, getFeaturedProducts };
