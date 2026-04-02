const asyncHandler = require('express-async-handler');
const Coupon = require('../models/Coupon');

const validateCoupon = asyncHandler(async (req, res) => {
  const { code, orderTotal } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

  if (!coupon) { res.status(404); throw new Error('Invalid coupon code'); }
  if (new Date(coupon.expiresAt) < new Date()) { res.status(400); throw new Error('Coupon expired'); }
  if (coupon.usedCount >= coupon.maxUses) { res.status(400); throw new Error('Coupon usage limit reached'); }
  if (coupon.usedBy.includes(req.user._id)) { res.status(400); throw new Error('Coupon already used'); }
  if (orderTotal < coupon.minOrder) { res.status(400); throw new Error(`Minimum order: ${coupon.minOrder} SAR`); }

  let discount = 0;
  if (coupon.type === 'percent') {
    discount = (orderTotal * coupon.discount) / 100;
  } else {
    discount = coupon.discount;
  }

  res.json({ success: true, discount: Math.min(discount, orderTotal), coupon: { code: coupon.code, type: coupon.type, discount: coupon.discount } });
});

const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json({ success: true, coupons });
});

const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, coupon });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!coupon) { res.status(404); throw new Error('Coupon not found'); }
  res.json({ success: true, coupon });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Coupon removed' });
});

module.exports = { validateCoupon, getCoupons, createCoupon, updateCoupon, deleteCoupon };
