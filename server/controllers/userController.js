const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get all users (admin)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, users, total: users.length });
});

// @desc    Update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, avatar } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id,
    { name, email, phone, avatar },
    { new: true, runValidators: true }
  );
  res.json({ success: true, user });
});

// @desc    Add/update address
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses.push(req.body);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
});

// @desc    Remove address
const removeAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses = user.addresses.filter(a => a._id.toString() !== req.params.addressId);
  await user.save();
  res.json({ success: true, addresses: user.addresses });
});

// @desc    Toggle wishlist item
const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const idx = user.wishlist.indexOf(req.body.productId);
  if (idx > -1) {
    user.wishlist.splice(idx, 1);
  } else {
    user.wishlist.push(req.body.productId);
  }
  await user.save();
  await user.populate('wishlist');
  res.json({ success: true, wishlist: user.wishlist });
});

// @desc    Get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json({ success: true, wishlist: user.wishlist });
});

// @desc    Delete user (admin)
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'User removed' });
});

// @desc    Update user role (admin)
const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
  res.json({ success: true, user });
});

module.exports = { getUsers, updateProfile, addAddress, removeAddress, toggleWishlist, getWishlist, deleteUser, updateUserRole };
