const prisma = require('../prisma/client');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            sort,
            page = 1,
            limit = 10,
            minPrice,
            maxPrice,
        } = req.query;

        const query = {
            where: {},
        };

        // Search
        if (search) {
            query.where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Filter by category
        if (category) {
            query.where.category = category;
        }

        // Filter by price
        if (minPrice || maxPrice) {
            query.where.price = {};
            if (minPrice) query.where.price.gte = parseFloat(minPrice);
            if (maxPrice) query.where.price.lte = parseFloat(maxPrice);
        }

        // Sort
        if (sort) {
            const sortBy = sort.split(',')[0]; // e.g., 'price'
            const order = sort.split(',')[1] || 'asc'; // e.g., 'desc'
            query.orderBy = {
                [sortBy]: order,
            };
        }

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        const products = await prisma.product.findMany({
            ...query,
            skip,
            take: limitNum,
        });

        const total = await prisma.product.count({ where: query.where });

        res.json({
            products,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                category,
                stock,
                imageUrl,
            },
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        const product = await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: {
                name,
                description,
                price,
                category,
                stock,
                imageUrl,
            },
        });

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: { id: parseInt(req.params.id) },
        });

        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
