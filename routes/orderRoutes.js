const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, placeOrder).get(protect, getUserOrders);
router.route('/admin').get(protect, admin, getAllOrders);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
