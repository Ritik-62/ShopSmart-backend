const prisma = require('../prisma/client');

// @desc    Place new order
// @route   POST /api/orders
// @access  Private
exports.placeOrder = async (req, res) => {
    try {
        // Get cart items
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: req.user.id },
            include: { product: true },
        });

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Calculate total
        const totalAmount = cartItems.reduce(
            (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
            0
        );

        // Create order
        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                totalAmount,
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                    })),
                },
            },
            include: { items: true },
        });

        // Clear cart
        await prisma.cartItem.deleteMany({
            where: { userId: req.user.id },
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const orderBy = {};
        if (sort) {
            const [field, order] = sort.split(',');
            orderBy[field] = order || 'asc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
            include: { items: { include: { product: true } } },
            orderBy,
            skip,
            take: limitNum,
        });

        const total = await prisma.order.count({ where: { userId: req.user.id } });

        res.json({
            orders,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const orderBy = {};
        if (sort) {
            const [field, order] = sort.split(',');
            orderBy[field] = order || 'asc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const orders = await prisma.order.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: { include: { product: true } },
            },
            orderBy,
            skip,
            take: limitNum,
        });

        const total = await prisma.order.count();

        res.json({
            orders,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await prisma.order.update({
            where: { id: parseInt(req.params.id) },
            data: { status },
        });

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
