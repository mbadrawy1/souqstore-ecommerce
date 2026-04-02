const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const slugify = require('slugify');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true });
  res.json({ success: true, categories });
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) { res.status(404); throw new Error('Category not found'); }
  res.json({ success: true, category });
});

const createCategory = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.name.en, { lower: true });
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, category });
});

const updateCategory = asyncHandler(async (req, res) => {
  if (req.body.name && req.body.name.en) req.body.slug = slugify(req.body.name.en, { lower: true });
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!category) { res.status(404); throw new Error('Category not found'); }
  res.json({ success: true, category });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) { res.status(404); throw new Error('Category not found'); }
  res.json({ success: true, message: 'Category removed' });
});

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
