# 🛒 ShopSmart - Full-Stack E-Commerce Application

A modern, full-featured e-commerce platform built with React, Node.js, Express, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## ✨ Features

### For Customers
- 🔐 User authentication (signup/login with JWT)
- 🛍️ Browse products with search, filter, and sort
- 🛒 Shopping cart management
- 📦 Order placement and tracking
- 📱 Responsive design for all devices
- 🎨 Modern, intuitive UI

### For Admins
- 👨‍💼 Separate admin dashboard
- 📊 View all orders with pagination
- ✏️ Create, update, and delete products
- 🔄 Update order status (Pending/Completed/Cancelled)
- 📈 Sort and filter orders

### Technical Features
- ✅ Backend pagination and sorting
- ✅ Role-based access control (User/Admin)
- ✅ Secure password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ RESTful API design
- ✅ Database relationships with Prisma ORM
- ✅ Error handling and validation

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** 5.x - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
ShopSmart/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── lib/           # API utilities
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth middleware
│   ├── prisma/           # Database schema & client
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   └── package.json
│
├── POSTMAN_GUIDE.md      # API testing guide
├── API_ROUTES.md         # API documentation
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** database
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopsmart.git
   cd ShopSmart
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create `.env` file in the `server` directory:
   ```env
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_secret_key_here"
   PORT=5001
   ```

5. **Set up the database**
   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

6. **Seed the database** (optional but recommended)
   ```bash
   npm run seed
   ```

7. **Start the development servers**

   **Backend (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on `http://localhost:5001`

   **Frontend (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on `http://localhost:5173`

8. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🔐 Environment Variables

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your_super_secret_key` |
| `PORT` | Server port number | `5001` |

---

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

# ShopSmart API - Postman Testing Guide

Base URL: `https://shop-smart-backend.vercel.app/api`

---

## 1. Authentication Routes (Public)

### 1.1 User Signup
**POST** `/auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Body (Regular User):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Body (Admin User):**
```json
{
  "name": "Admin User",
  "email": "newadmin@example.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "USER",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 1.2 User Login
**POST** `/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (Regular User):**
```json
{
  "email": "user@example.com",
  "password": "user123"
}
```

**Body (Admin User):**
```json
{
  "email": "admin@shopsmart.com",
  "password": "admin123"
}
```

**Expected Response:**
```json
{
  "id": 2,
  "name": "Admin User",
  "email": "admin@shopsmart.com",
  "role": "ADMIN",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ Important:** Copy the `token` from the response. You'll need it for authenticated requests!

---

## 2. Product Routes

### 2.1 Get All Products (Public)
**GET** `/products`

**Query Parameters (Optional):**
- `page=1` - Page number
- `limit=10` - Items per page
- `search=wireless` - Search in name/description
- `category=Electronics` - Filter by category
- `minPrice=50` - Minimum price
- `maxPrice=200` - Maximum price
- `sort=price,asc` - Sort by field (price,asc or price,desc)

**Example URLs:**
```
/products
/products?page=1&limit=8
/products?category=Electronics&sort=price,asc
/products?search=headphones&minPrice=50&maxPrice=200
```

**Expected Response:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "description": "Premium noise-cancelling wireless headphones",
      "price": "199.99",
      "category": "Electronics",
      "stock": 50,
      "imageUrl": "https://images.unsplash.com/...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "pages": 1,
  "total": 5
}
```

---

### 2.2 Get Single Product (Public)
**GET** `/products/:id`

**Example:**
```
GET /products/1
```

**Expected Response:**
```json
{
  "id": 1,
  "name": "Wireless Headphones",
  "description": "Premium noise-cancelling wireless headphones",
  "price": "199.99",
  "category": "Electronics",
  "stock": 50,
  "imageUrl": "https://images.unsplash.com/...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 2.3 Create Product (Admin Only)
**POST** `/products`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Body:**
```json
{
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop with RTX 4080",
  "price": 1999.99,
  "category": "Electronics",
  "stock": 10,
  "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302"
}
```

**Expected Response:**
```json
{
  "id": 6,
  "name": "Gaming Laptop",
  "description": "High-performance gaming laptop with RTX 4080",
  "price": "1999.99",
  "category": "Electronics",
  "stock": 10,
  "imageUrl": "https://images.unsplash.com/...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 2.4 Update Product (Admin Only)
**PUT** `/products/:id`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Example:**
```
PUT /products/6
```

**Body:**
```json
{
  "name": "Gaming Laptop Pro",
  "description": "Updated description",
  "price": 2199.99,
  "category": "Electronics",
  "stock": 15,
  "imageUrl": "https://images.unsplash.com/photo-1603302576837-37561b2e2302"
}
```

**Expected Response:**
```json
{
  "id": 6,
  "name": "Gaming Laptop Pro",
  "description": "Updated description",
  "price": "2199.99",
  "category": "Electronics",
  "stock": 15,
  "imageUrl": "https://images.unsplash.com/...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 2.5 Delete Product (Admin Only)
**DELETE** `/products/:id`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Example:**
```
DELETE /products/6
```

**Expected Response:**
```json
{
  "message": "Product removed"
}
```

---

## 3. Cart Routes (Authenticated Users)

### 3.1 Get User Cart
**GET** `/cart`

**Headers:**
```
Authorization: Bearer YOUR_USER_TOKEN_HERE
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "userId": 3,
    "productId": 1,
    "quantity": 2,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "product": {
      "id": 1,
      "name": "Wireless Headphones",
      "price": "199.99",
      "imageUrl": "https://images.unsplash.com/...",
      "stock": 50
    }
  }
]
```

---

### 3.2 Add Item to Cart
**POST** `/cart`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_USER_TOKEN_HERE
```

**Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Expected Response:**
```json
{
  "id": 1,
  "userId": 3,
  "productId": 1,
  "quantity": 2,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "product": {
    "id": 1,
    "name": "Wireless Headphones",
    "price": "199.99",
    "imageUrl": "https://images.unsplash.com/..."
  }
}
```

---

### 3.3 Update Cart Item Quantity
**PUT** `/cart/:id`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_USER_TOKEN_HERE
```

**Example:**
```
PUT /cart/1
```

**Body:**
```json
{
  "quantity": 5
}
```

**Expected Response:**
```json
{
  "id": 1,
  "userId": 3,
  "productId": 1,
  "quantity": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "product": {
    "id": 1,
    "name": "Wireless Headphones",
    "price": "199.99"
  }
}
```

---

### 3.4 Remove Item from Cart
**DELETE** `/cart/:id`

**Headers:**
```
Authorization: Bearer YOUR_USER_TOKEN_HERE
```

**Example:**
```
DELETE /cart/1
```

**Expected Response:**
```json
{
  "message": "Item removed"
}
```

---

## 4. Order Routes

### 4.1 Place Order (Authenticated Users)
**POST** `/orders`

**Headers:**
```
Authorization: Bearer YOUR_USER_TOKEN_HERE
```

**Body:** (Empty - uses items from cart)
```json
{}
```

**Expected Response:**
```json
{
  "id": 1,
  "userId": 3,
  "totalAmount": "399.98",
  "status": "PENDING",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "items": [
    {
      "id": 1,
      "orderId": 1,
      "productId": 1,
      "quantity": 2,
      "price": "199.99"
    }
  ]
}
```

---

### 4.2 Get User Orders (Authenticated Users)
**GET** `/orders`

**Headers:**
```
Authorization: Bearer YOUR_USER_TOKEN_HERE
```

**Query Parameters (Optional):**
- `page=1` - Page number
- `limit=10` - Items per page
- `sort=createdAt,desc` - Sort by field

**Example URLs:**
```
/orders
/orders?page=1&limit=10&sort=createdAt,desc
/orders?sort=totalAmount,desc
```

**Expected Response:**
```json
{
  "orders": [
    {
      "id": 1,
      "userId": 3,
      "totalAmount": "399.98",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "items": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "quantity": 2,
          "price": "199.99",
          "product": {
            "id": 1,
            "name": "Wireless Headphones",
            "imageUrl": "https://images.unsplash.com/..."
          }
        }
      ]
    }
  ],
  "page": 1,
  "pages": 1,
  "total": 3
}
```

---

### 4.3 Get All Orders (Admin Only)
**GET** `/orders/admin`

**Headers:**
```
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Query Parameters (Optional):**
- `page=1` - Page number
- `limit=10` - Items per page
- `sort=createdAt,desc` - Sort by field

**Example URLs:**
```
/orders/admin
/orders/admin?page=1&limit=10&sort=totalAmount,desc
/orders/admin?sort=createdAt,asc
```

**Expected Response:**
```json
{
  "orders": [
    {
      "id": 1,
      "userId": 3,
      "totalAmount": "399.98",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "user": {
        "id": 3,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "items": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "quantity": 2,
          "price": "199.99",
          "product": {
            "id": 1,
            "name": "Wireless Headphones"
          }
        }
      ]
    }
  ],
  "page": 1,
  "pages": 1,
  "total": 4
}
```

---

### 4.4 Update Order Status (Admin Only)
**PUT** `/orders/:id/status`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_ADMIN_TOKEN_HERE
```

**Example:**
```
PUT /orders/1/status
```

**Body:**
```json
{
  "status": "COMPLETED"
}
```

**Valid Status Values:**
- `PENDING`
- `COMPLETED`
- `CANCELLED`

**Expected Response:**
```json
{
  "id": 1,
  "userId": 3,
  "totalAmount": "399.98",
  "status": "COMPLETED",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Testing Workflow

### 1. Setup (Do Once)
1. **Signup as Admin:**
   - POST `/auth/signup` with `role: "ADMIN"`
   - Save the token

2. **Signup as User:**
   - POST `/auth/signup` without role
   - Save the token

### 2. Test User Flow
1. Login as user → Get token
2. Browse products → GET `/products`
3. Add to cart → POST `/cart`
4. Update cart → PUT `/cart/:id`
5. Place order → POST `/orders`
6. View orders → GET `/orders`

### 3. Test Admin Flow
1. Login as admin → Get token
2. Create product → POST `/products`
3. Update product → PUT `/products/:id`
4. View all orders → GET `/orders/admin`
5. Update order status → PUT `/orders/:id/status`
6. Delete product → DELETE `/products/:id`

---

## Postman Tips

### Setting Up Environment Variables
1. Create a new environment in Postman
2. Add variables:
   - `base_url` = `https://shop-smart-backend.vercel.app/api`
   - `user_token` = (paste user token after login)
   - `admin_token` = (paste admin token after login)

3. Use in requests:
   - URL: `{{base_url}}/products`
   - Authorization: `Bearer {{admin_token}}`

### Testing Pagination
Try different page numbers:
```
GET /products?page=1&limit=2
GET /products?page=2&limit=2
```

### Testing Sorting
```
GET /products?sort=price,asc
GET /products?sort=price,desc
GET /orders?sort=totalAmount,desc
```

### Testing Filters
```
GET /products?category=Electronics
GET /products?search=wireless
GET /products?minPrice=100&maxPrice=300
```

---

## Common Errors

**401 Unauthorized:**
- Missing or invalid token
- Token expired
- Wrong role (user trying to access admin route)

**400 Bad Request:**
- Missing required fields
- Invalid data format
- User already exists (signup)

**404 Not Found:**
- Product/Order/Cart item doesn't exist
- Wrong ID

**500 Server Error:**
- Database connection issue
- Server crash
- Check server logs

---

## Pre-seeded Test Data

**Admin Account:**
- Email: `admin@shopsmart.com`
- Password: `admin123`

**User Account:**
- Email: `user@example.com`
- Password: `user123`

**Products:** 5 sample products already in database (run `npm run seed` if needed)


## 📸 Screenshots

### Customer View
- **Home Page** - Welcome page with featured products
- **Products Page** - Browse with search, filter, and sort
- **Product Details** - Detailed product information
- **Cart** - Shopping cart management
- **My Orders** - Order history with status

### Admin View
- **Admin Dashboard** - Manage products and orders
- **Orders Tab** - View all orders with pagination and sorting
- **Products Tab** - Create, update, and delete products

---

## 🔑 Key Features Explained

### Pagination & Sorting
All pagination and sorting is handled by the backend for optimal performance:
- Products: 8 items per page
- Orders: 10 items per page
- Sort by price, date, amount, etc.

### Role-Based Access Control
- **Public routes:** Products listing, product details
- **User routes:** Cart, orders, checkout
- **Admin routes:** Product management, all orders, order status updates

### Security
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 30-day expiration
- Protected routes with authentication middleware
- Admin-only routes with role verification

---

## 📝 Database Schema

### Models
- **User** - User accounts (customers and admins)
- **Product** - Product catalog
- **CartItem** - Shopping cart items
- **Order** - Customer orders
- **OrderItem** - Items in each order

### Relationships
- User → CartItems (one-to-many)
- User → Orders (one-to-many)
- Product → CartItems (one-to-many)
- Product → OrderItems (one-to-many)
- Order → OrderItems (one-to-many)

---

## 🎯 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Order tracking
- [ ] Advanced analytics dashboard
- [ ] Product image upload
- [ ] Discount codes and coupons
- [ ] Multi-language support
- [ ] Dark mode

---

## 🐛 Troubleshooting

### Port 5000 Already in Use (macOS)
If you get a port conflict error, it's likely AirPlay Receiver. The app is configured to use port 5001 instead.

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Run `npx prisma db push` to sync schema

### CORS Errors
- Backend is configured for `http://localhost:5173`
- If using a different port, update `index.js` in server

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- Tailwind CSS for the utility-first CSS framework
- All open-source contributors

---

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

