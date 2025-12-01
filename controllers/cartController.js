const prisma = require('../prisma/client');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res) => {
    try {
        const cartItems = await prisma.cartItem.findMany({
            where: { userId: req.user.id },
            include: {
                product: true,
            },
        });

        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId: req.user.id,
                    productId: parseInt(productId),
                },
            },
        });

        if (existingItem) {
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) },
                include: { product: true },
            });
            return res.json(updatedItem);
        }

        const newItem = await prisma.cartItem.create({
            data: {
                userId: req.user.id,
                productId: parseInt(productId),
                quantity: parseInt(quantity),
            },
            include: { product: true },
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
exports.removeFromCart = async (req, res) => {
    try {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (cartItem.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await prisma.cartItem.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.json({ message: 'Item removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        if (cartItem.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedItem = await prisma.cartItem.update({
            where: { id: parseInt(req.params.id) },
            data: { quantity: parseInt(quantity) },
            include: { product: true },
        });

        res.json(updatedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
