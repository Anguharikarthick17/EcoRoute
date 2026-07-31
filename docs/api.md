# EcoRoute REST API Documentation

Official REST API reference for the EcoRoute E-Waste Management Platform.

Base URL: `http://localhost:5000/api`

---

## Authentication Endpoints

### 1. Register User
- **POST** `/users/register`
- **Request Body**:
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "password": "securePassword123",
  "role": "CITIZEN"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "u-101",
      "name": "Rajesh Kumar",
      "email": "rajesh@example.com",
      "role": "CITIZEN"
    },
    "token": "eyJhbGciOiJIUzI1Ni..."
  }
}
```

### 2. Login User
- **POST** `/users/login`
- **Request Body**:
```json
{
  "email": "rajesh@example.com",
  "password": "securePassword123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "u-101",
      "name": "Rajesh Kumar",
      "email": "rajesh@example.com",
      "role": "CITIZEN"
    },
    "token": "eyJhbGciOiJIUzI1Ni..."
  }
}
```

---

## E-Waste Items Endpoints

### 1. List All E-Waste Items
- **GET** `/items`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "ew_101",
      "deviceName": "HP Pavilion Laptop Scrap",
      "brand": "HP",
      "category": "Laptops & Computers",
      "condition": "Non-working / Damaged",
      "price": "₹1,800",
      "sellerName": "Rajesh Kumar",
      "sellerCity": "New Delhi",
      "status": "AVAILABLE"
    }
  ]
}
```

### 2. Create E-Waste Scrap Listing
- **POST** `/items`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
```json
{
  "deviceName": "Samsung Galaxy S10 Shattered Display",
  "brand": "Samsung",
  "category": "Mobile Phones & Tablets",
  "condition": "Partially Working",
  "price": "950",
  "sellerName": "Anbu Chezhian",
  "sellerCity": "Salem"
}
```

### 3. Purchase / Reserve Scrap Item
- **POST** `/items/:id/purchase`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "ew_101",
    "status": "SOLD"
  }
}
```

---

## Green Coins & Rewards Endpoints

### 1. Get User Green Coins & History
- **GET** `/rewards/my-rewards`
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "userId": "u-101",
    "totalPoints": 450,
    "history": [
      {
        "id": "r-1",
        "points": 100,
        "title": "Recycled 5 Laptops",
        "createdAt": "2026-07-31T10:00:00Z"
      }
    ]
  }
}
```

---

## Error Codes & Handling

| HTTP Code | Error Message | Reason |
|---|---|---|
| 400 | `Email and password are required` | Invalid request payload |
| 401 | `Access token missing` | Unauthorized access |
| 403 | `Invalid or expired token` | Invalid JWT signature |
| 404 | `Item not found` | Resource does not exist |
| 500 | `Internal Server Error` | Unexpected server failure |
