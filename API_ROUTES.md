# ShopSmart API Routes

## Authentication Routes
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register new user | Public |
| `/api/auth/login` | POST | Authenticate user | Public |

**Admin Login Credentials:**
- Email: `admin@shopsmart.com`
- Password: `admin123`

**User Login Credentials:**
- Email: `user@example.com`
- Password: `user123`

---

## Product Routes
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/products` | GET | Get all products (supports search, sort, filter, pagination) | Public |
| `/api/products/:id` | GET | Get single product details | Public |
| `/api/products` | POST | Add new product | Admin only |
| `/api/products/:id` | PUT | Update product | Admin only |
| `/api/products/:id` | DELETE | Delete product | Admin only |

**Query Parameters for GET /api/products:**
- `search` - Search in name and description
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `sort` - Sort by field (e.g., `price,asc` or `price,desc`)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

---

## Cart Routes
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/cart` | GET | Get user's cart items | Authenticated |
| `/api/cart` | POST | Add item to cart | Authenticated |
| `/api/cart/:id` | PUT | Update cart item quantity | Authenticated |
| `/api/cart/:id` | DELETE | Remove item from cart | Authenticated |

---

## Order Routes
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/orders` | POST | Place new order | Authenticated |
| `/api/orders` | GET | View user's orders | Authenticated |
| `/api/orders/admin` | GET | View all orders (admin) | Admin only |
| `/api/orders/:id/status` | PUT | Update order status | Admin only |

**Query Parameters for GET /api/orders:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort by field (e.g., `createdAt,desc`)

**Query Parameters for GET /api/orders/admin:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort by field (e.g., `createdAt,desc`)

---

## Status: ✅ All Routes Implemented

All routes from your requirements are fully implemented with:
- ✅ Proper authentication and authorization
- ✅ Pagination and sorting where needed
- ✅ Role-based access control (User/Admin)
- ✅ Input validation and error handling
