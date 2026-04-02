const router = require('express').Router();
const { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus, getAdminStats } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/admin/all', protect, admin, getAllOrders);
router.get('/admin/stats', protect, admin, getAdminStats);
router.route('/:id').get(protect, getOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
