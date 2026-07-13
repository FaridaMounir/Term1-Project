# 🛒 E-Commerce API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB** for managing an e-commerce system. The API allows users to manage products, categories, shopping carts, and orders.

---

# 📖 Project Description

This project provides backend services for an online shopping platform. It follows REST API principles and uses MongoDB as the database.

## ✨ Features

- User Authentication
- Category Management
- Product Management
- Shopping Cart
- Order Management
- Error Handling
- Environment Variables
- MongoDB Database Integration

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- dotenv

---

# 📂 API Modules

- Categories
- Products
- Cart
- Orders
- Users

---

# ⚙️ Prerequisites

Before running this project, install:

- Node.js
- npm
- MongoDB

Check versions:

```bash
node -v
npm -v
mongod --version
```

---

# 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/FaridaMounir/ecommerce-api.git
```

### 2. Go to project folder

```bash
cd ecommerce-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:3000
```

### 5. Start the server

Development mode

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server Port | 3000 |
| MONGODB_URI | MongoDB Connection String | mongodb://localhost:27017/ecommerce |
| NODE_ENV | Environment | development |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| CORS_ORIGIN | Allowed Origin | http://localhost:3000 |

---

# 📡 API Endpoints

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/categories | Get all categories |
| GET | /api/categories/:id | Get category by ID |
| POST | /api/categories | Create category |
| PATCH | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

---

## Products

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create product |
| PATCH | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

---

## Cart

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/cart | Get user cart |
| POST | /api/cart | Add item to cart |
| PATCH | /api/cart/:id | Update cart item |
| DELETE | /api/cart/:id | Remove item from cart |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/orders | Get all orders |
| GET | /api/orders/:id | Get order by ID |
| POST | /api/orders | Create order |
| PATCH | /api/orders/:id | Update order |
| DELETE | /api/orders/:id | Cancel order |

---

# 📁 Project Structure

```
ecommerce-api/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── .env
├── .gitignore
├── package.json
├── app.js
└── README.md
```

---

# ▶️ Available Scripts

```bash
npm start
```

Runs the application in production mode.

---