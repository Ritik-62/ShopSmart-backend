const express = require('express');
const router = express.Router();
const { protect, superadmin } = require('../middleware/authMiddleware');
const {
    getAllUsers,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController');

// All routes require superadmin access
router.get('/', protect, superadmin, getAllUsers);
router.put('/:id/role', protect, superadmin, updateUserRole);
router.delete('/:id', protect, superadmin, deleteUser);

module.exports = router;
