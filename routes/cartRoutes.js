const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/:id').delete(protect, removeFromCart).put(protect, updateCartItem);

module.exports = router;
