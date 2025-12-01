const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

let adminToken = '';
let userToken = '';
let orderId = '';
let cartItemId = '';

// Helper function to log results
const log = (message, data = null) => {
    console.log(`\n✓ ${message}`);
    if (data) console.log(JSON.stringify(data, null, 2));
};

const logError = (message, error) => {
    console.error(`\n✗ ${message}`);
    console.error(error.response?.data || error.message);
};

// Test Admin Login
async function testAdminLogin() {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@shopsmart.com',
            password: 'admin123',
        });
        adminToken = response.data.token;
        log('Admin login successful', { token: adminToken.substring(0, 20) + '...' });
    } catch (error) {
        logError('Admin login failed', error);
        throw error;
    }
}

// Test User Login
async function testUserLogin() {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email: 'user@example.com',
            password: 'user123',
        });
        userToken = response.data.token;
        log('User login successful', { token: userToken.substring(0, 20) + '...' });
    } catch (error) {
        logError('User login failed', error);
        throw error;
    }
}

// Test Get All Orders with Pagination (Admin)
async function testGetAllOrdersPaginated() {
    try {
        const response = await axios.get(`${API_URL}/orders/admin?page=1&limit=5&sort=createdAt,desc`, {
            headers: { Authorization: `Bearer ${adminToken}` },
        });
        log('Get all orders with pagination (Admin)', {
            total: response.data.total,
            page: response.data.page,
            pages: response.data.pages,
            ordersCount: response.data.orders.length,
        });
        if (response.data.orders.length > 0) {
            orderId = response.data.orders[0].id;
        }
    } catch (error) {
        logError('Get all orders failed', error);
    }
}

// Test Update Order Status (Admin)
async function testUpdateOrderStatus() {
    if (!orderId) {
        console.log('\n⚠ Skipping order status update - no order ID available');
        return;
    }
    try {
        const response = await axios.put(
            `${API_URL}/orders/${orderId}/status`,
            { status: 'COMPLETED' },
            { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        log('Update order status (Admin)', { orderId, newStatus: response.data.status });
    } catch (error) {
        logError('Update order status failed', error);
    }
}

// Test Get User Orders with Pagination
async function testGetUserOrdersPaginated() {
    try {
        const response = await axios.get(`${API_URL}/orders?page=1&limit=5&sort=createdAt,desc`, {
            headers: { Authorization: `Bearer ${userToken}` },
        });
        log('Get user orders with pagination', {
            total: response.data.total,
            page: response.data.page,
            pages: response.data.pages,
            ordersCount: response.data.orders.length,
        });
    } catch (error) {
        logError('Get user orders failed', error);
    }
}

// Test Add to Cart
async function testAddToCart() {
    try {
        const response = await axios.post(
            `${API_URL}/cart`,
            { productId: 1, quantity: 2 },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        cartItemId = response.data.id;
        log('Add to cart', { cartItemId, quantity: response.data.quantity });
    } catch (error) {
        logError('Add to cart failed', error);
    }
}

// Test Update Cart Item
async function testUpdateCartItem() {
    if (!cartItemId) {
        console.log('\n⚠ Skipping cart item update - no cart item ID available');
        return;
    }
    try {
        const response = await axios.put(
            `${API_URL}/cart/${cartItemId}`,
            { quantity: 5 },
            { headers: { Authorization: `Bearer ${userToken}` } }
        );
        log('Update cart item quantity', { cartItemId, newQuantity: response.data.quantity });
    } catch (error) {
        logError('Update cart item failed', error);
    }
}

// Test Get Cart
async function testGetCart() {
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${userToken}` },
        });
        log('Get cart', { itemsCount: response.data.length });
    } catch (error) {
        logError('Get cart failed', error);
    }
}

// Run all tests
async function runTests() {
    console.log('=== Backend Verification Tests ===\n');

    await testAdminLogin();
    await testUserLogin();

    console.log('\n--- Order Management Tests ---');
    await testGetAllOrdersPaginated();
    await testUpdateOrderStatus();
    await testGetUserOrdersPaginated();

    console.log('\n--- Cart Management Tests ---');
    await testAddToCart();
    await testUpdateCartItem();
    await testGetCart();

    console.log('\n\n=== All Tests Completed ===');
}

runTests().catch((error) => {
    console.error('\n\nTest suite failed:', error.message);
    process.exit(1);
});
