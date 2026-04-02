const router = require('express').Router();
const { getUsers, updateProfile, addAddress, removeAddress, toggleWishlist, getWishlist, deleteUser, updateUserRole } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, getUsers);
router.put('/profile', protect, updateProfile);
router.post('/address', protect, addAddress);
router.delete('/address/:addressId', protect, removeAddress);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist', protect, toggleWishlist);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id/role', protect, admin, updateUserRole);

module.exports = router;
