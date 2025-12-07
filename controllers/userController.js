const prisma = require('../prisma/client');

// Get all users (Superadmin only)
exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role } = req.query;
        const skip = (page - 1) * limit;

        const where = {};
        if (role) {
            where.role = role;
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    _count: {
                        select: {
                            orders: true,
                            cart: true,
                        },
                    },
                },
                skip: parseInt(skip),
                take: parseInt(limit),
                orderBy: { createdAt: 'desc' },
            }),
            prisma.user.count({ where }),
        ]);

        res.json({
            users,
            page: parseInt(page),
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user role (Superadmin only)
exports.updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!['USER', 'ADMIN', 'SUPERADMIN'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });

        res.json(user);
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user (Superadmin only)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);

        // Prevent superadmin from deleting themselves
        if (userId === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        // Delete user's cart items, orders, and order items
        await prisma.$transaction(async (tx) => {
            // Delete cart items
            await tx.cartItem.deleteMany({
                where: { userId },
            });

            // Get all orders for this user
            const orders = await tx.order.findMany({
                where: { userId },
                select: { id: true },
            });

            // Delete order items
            if (orders.length > 0) {
                await tx.orderItem.deleteMany({
                    where: {
                        orderId: {
                            in: orders.map((o) => o.id),
                        },
                    },
                });
            }

            // Delete orders
            await tx.order.deleteMany({
                where: { userId },
            });

            // Finally, delete the user
            await tx.user.delete({
                where: { id: userId },
            });
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
