const router = require('express').Router();
const { getProductReviews, createReview, deleteReview, likeReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.route('/product/:productId').get(getProductReviews).post(protect, createReview);
router.route('/:id').delete(protect, deleteReview);
router.put('/:id/like', protect, likeReview);

module.exports = router;
