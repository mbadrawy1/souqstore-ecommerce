const router = require('express').Router();
const { getProducts, getProduct, getRelatedProducts, createProduct, updateProduct, deleteProduct, getFeaturedProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.get('/featured', getFeaturedProducts);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.get('/:id/related', getRelatedProducts);

module.exports = router;
