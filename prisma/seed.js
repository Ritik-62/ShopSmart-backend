const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // Clean up existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
        data: {
            email: 'admin@shopsmart.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log(`Created admin user: ${admin.email}`);

    // Create Customer User
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.create({
        data: {
            email: 'user@example.com',
            name: 'John Doe',
            password: userPassword,
            role: 'USER',
        },
    });
    console.log(`Created customer user: ${user.email}`);

    // Create Products
    const products = [
        {
            name: 'Wireless Headphones',
            description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
            price: 199.99,
            category: 'Electronics',
            stock: 50,
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        },
        {
            name: 'Smart Watch',
            description: 'Fitness tracker with heart rate monitor and GPS.',
            price: 149.99,
            category: 'Electronics',
            stock: 30,
            imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        },
        {
            name: 'Running Shoes',
            description: 'Lightweight and comfortable running shoes for daily training.',
            price: 89.99,
            category: 'Fashion',
            stock: 100,
            imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        },
        {
            name: 'Leather Backpack',
            description: 'Durable leather backpack with laptop compartment.',
            price: 129.99,
            category: 'Fashion',
            stock: 20,
            imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        },
        {
            name: 'Coffee Maker',
            description: 'Programmable coffee maker with thermal carafe.',
            price: 79.99,
            category: 'Home',
            stock: 15,
            imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
        },
    ];

    for (const p of products) {
        const product = await prisma.product.create({
            data: p,
        });
        console.log(`Created product: ${product.name}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
