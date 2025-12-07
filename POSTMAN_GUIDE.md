# ShopSmart API - Postman Testing Guide

Base URL: `https://shopsmart-api.onrender.com/api`

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
   - `base_url` = `https://shopsmart-api.onrender.com/api`
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
