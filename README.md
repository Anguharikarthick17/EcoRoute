# 🌿 EcoRoute — AI-Powered E-Waste Management Platform

[![EcoRoute CI Pipeline](https://github.com/Anguharikarthick17/EcoRoute/actions/workflows/ci.yml/badge.svg)](https://github.com/Anguharikarthick17/EcoRoute/actions)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v18.0.0-green.svg)
![React](https://img.shields.io/badge/React-v18.2.0-blue.svg)
![Express](https://img.shields.io/badge/Express-v4.19.2-lightgrey.svg)

**EcoRoute** is an AI-powered e-waste management & recycling marketplace platform designed in accordance with **Government of India Central Pollution Control Board (CPCB)** and **Ministry of Environment, Forest and Climate Change (MoEFCC)** standards.

The platform enables citizens to identify and valuate e-waste scrap using AI computer vision, request doorstep pickup, earn Green Coins redeemable for cash or utility bill discounts (EB/Water), and enables certified recyclers to purchase e-waste scrap seamlessly.

---

## 🏗️ Repository Architecture

EcoRoute is structured as an enterprise monorepo with distinct frontend, backend, and documentation packages:

```text
EcoRoute/
├── backend/                  # Node.js & Express REST API Service
│   ├── src/
│   │   ├── config/           # Database, auth, and Winston logger config
│   │   ├── controllers/      # Express route controllers
│   │   ├── routes/           # User, Item, Reward, Priority routes
│   │   ├── models/           # User, Item, Reward, Priority data models
│   │   ├── middlewares/      # JWT Auth, Error handler, Validation
│   │   ├── services/         # Core business logic services
│   │   ├── utils/            # Auth, DB, and Validation utilities
│   │   └── tests/            # Jest unit & integration test suites
│   ├── Dockerfile
│   └── package.json
├── frontend/                 # React & Next.js Presentation Application
│   ├── src/
│   │   ├── components/       # Header, Footer, Navigation, Dashboard, ItemList, Rewards
│   │   ├── pages/            # Home, Login, Register, Profile, ItemManagement, Rewards
│   │   ├── services/         # API Service client layer
│   │   ├── utils/            # Formatting & validation helpers
│   │   └── tests/            # React testing library component tests
│   ├── Dockerfile
│   └── package.json
├── docs/                     # Platform Documentation & Specifications
│   ├── api.md                # Comprehensive REST API reference & examples
│   ├── database.md           # Database models & PostgreSQL schema
│   ├── architecture.md       # Monorepo architecture & component flow
│   └── user-guide.md         # End-user manual for Citizens & Recyclers
├── .github/workflows/        # Automated GitHub Actions CI pipeline
├── docker-compose.yml        # Docker container orchestration setup
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **Docker** *(optional for containerized deployment)*

### 1. Clone the Repository
```bash
git clone https://github.com/Anguharikarthick17/EcoRoute.git
cd EcoRoute
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm start
```
*The backend REST API server will run on `http://localhost:5000`.*

### 3. Frontend Setup
```bash
cd ../frontend
npm install
cp .env.example .env
npm start
```
*The frontend web application will run on `http://localhost:3000`.*

### 4. Running via Docker Compose
```bash
docker-compose up --build
```

---

## 🧪 Running Tests

### Backend Unit & Integration Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

---

## 📖 Usage Guidelines

### 1. Citizen E-Waste Scrap Listing
1. Navigate to **Upload E-Waste** in the portal.
2. Capture a photo using camera or upload a file. EcoRoute AI Vision auto-populates category, brand, and valuation price.
3. Submit listing to earn Green Coins.

### 2. Recycler Buyer Marketplace & Intimation
1. Navigate to `/buyer`.
2. Select any listing and click **Buy / Intimate Pickup & Cash**.
3. Choose your preferred **Collection Date**, **Time Slot**, and **Payment Method** (Cash on Pickup, live scannable UPI QR Code, or Credit/Debit Card).
4. Download the CPCB compliant purchase token and launch Google Maps directions directly to the seller's location.

### 3. Green Coins & Utility Bill Redemption
1. Navigate to **Rewards & Points** in the dashboard.
2. Redeem Green Coins (1 Coin = ₹1) directly for **Instant Cash (UPI)**, **Electricity (EB) Bill Rebates**, or **Water Bill Waivers**.

---

## 🤝 Contribution Guidelines

We welcome contributions from the community! Follow these steps to contribute:

1. **Fork the Repository**: Click the "Fork" button on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your Changes**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push to Branch**:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**: Submit a Pull Request against the `main` branch with a clear summary of changes.

### Submitting Issues
If you find a bug or have a feature request, please open an issue on the [GitHub Issues](https://github.com/Anguharikarthick17/EcoRoute/issues) tab.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.

---

*EcoRoute — Digital India & Central Pollution Control Board (CPCB) Standard Compliance.*
