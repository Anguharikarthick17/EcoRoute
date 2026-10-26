# 04 — EcoRoute REST API Specification & Endpoint Reference

**Project**: EcoRoute — AI-Powered Scrap Marketplace  
**Milestone**: Review 3 Comprehensive API Reference  
**Standard**: Verified Against Active Source Code Only (`app/api/` & `backend/src/routes/`)  

---

## 1. API Architecture & General Conventions

EcoRoute provides two API layers:
1. **Next.js 16 Serverless App Router APIs** (`/api/...`): Serves citizen portals, AI vision processing, scrap marketplace listings, pickup scheduling, authentication cookies, and officer dashboards.
2. **Express REST API Microservice** (Port 5000, `backend/src/`): Standalone Node.js service providing containerized endpoints for user authentication, scrap item querying, priority calculation, and gamified trust/reward engines.

### Common Response Headers
- `Content-Type: application/json; charset=utf-8`

### Standard Response Structure
```json
{
  "success": true,
  "message": "Optional human-readable confirmation message",
  "data": { ... }
}
```

### Standard Error Response Structure
```json
{
  "success": false,
  "message": "Sanitized error description",
  "code": "OPTIONAL_ERROR_CODE",
  "errors": [ ... ]
}
```

---

## 2. Authentication & Identity Endpoints

### `POST /api/auth/register`
- **Purpose**: Registers a new citizen seller or verified scrap dealer.
- **Auth**: None (Public)
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!",
    "fullName": "Karthick A.",
    "role": "CITIZEN",
    "mobile": "9876543210",
    "city": "Coimbatore",
    "state": "Tamil Nadu",
    "address": "Eachanari Road",
    "pin": "641021",
    "recyclerShopName": "Optional for RECYCLER role"
  }
  ```
- **Success (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registration successful. You can now log in.",
    "user": {
      "id": "usr_1730000000",
      "email": "user@example.com",
      "fullName": "Karthick A.",
      "role": "CITIZEN",
      "citizenId": "DL-2026-4021"
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Email already exists or invalid password complexity.

---

### `POST /api/auth/login`
- **Purpose**: Authenticates credentials and sets an HTTP-only JWT session cookie (`ecoroute_token`).
- **Auth**: None (Public)
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "Password123!",
    "role": "citizen"
  }
  ```
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Citizen login successful.",
    "user": {
      "id": "usr_1730000000",
      "email": "user@example.com",
      "fullName": "Karthick A.",
      "role": "CITIZEN",
      "citizenId": "DL-2026-4021",
      "sessionExpiresAt": 1740000000000
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Zod validation failed.
  - `401 Unauthorized`: Invalid credentials.

---

### `POST /api/auth/logout`
- **Purpose**: Clears the authenticated session cookie (`ecoroute_token`).
- **Auth**: None
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

### `POST /api/auth/forgot-password`
- **Purpose**: Initiates password reset by dispatching an email token.
- **Request Body**: `{ "email": "user@example.com" }`
- **Success (200 OK)**: `{ "success": true, "message": "Password reset link sent to your registered email." }`

---

### `POST /api/auth/reset-password`
- **Purpose**: Confirms token and updates user password.
- **Request Body**: `{ "token": "rst_123", "password": "NewSecurePassword123!" }`
- **Success (200 OK)**: `{ "success": true, "message": "Password updated successfully." }`

---

### `GET /api/auth/verify-email`
- **Purpose**: Confirms user verification token.
- **Query Params**: `?token=ver_123`
- **Success (200 OK)**: `{ "success": true, "message": "Email verified successfully." }`

---

## 3. AI Computer Vision & Scrap Valuation Endpoints

### `POST /api/ai/scan-image`
- **Purpose**: Analyzes uploaded scrap/appliance photos using Gemini Vision or local heuristics to estimate material, condition, weight, authenticity, and Mandi price range.
- **Auth**: None
- **Request Body**:
  ```json
  {
    "imageDataUrl": "data:image/jpeg;base64,...",
    "fileName": "washing_machine_motor.jpg"
  }
  ```
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Scrap image analyzed successfully.",
    "data": {
      "isRealScrap": true,
      "authenticityScore": 99.1,
      "deviceName": "Old Washing Machine Scrap",
      "brand": "IFB / Bosch / LG / Whirlpool",
      "category": "Washing Machines",
      "material": "Stainless Steel Drum, Heavy Copper Motor, Steel Frame",
      "condition": "Non-working / Damaged",
      "askingPrice": "1800",
      "priceRange": "₹1,530 – ₹2,250",
      "estimatedWeight": "45.00",
      "estimatedAge": "6 years",
      "description": "AI Scrap Vision: Washing machine unit with heavy copper motor winding...",
      "aiBadges": ["Stainless Steel Drum", "Heavy Copper Motor", "High Metal Scrap"],
      "disclaimer": "AI estimates are approximate. Final price and weight are confirmed by the dealer during pickup."
    }
  }
  ```
- **Errors**:
  - `400 Bad Request`: Missing or malformed image data.
  - `500 Internal Server Error`: Masked AI service failure with diagnostic log.

---

### `POST /api/ai/classify`
- **Purpose**: Classifies scrap device types and provides CPCB-aligned recycling and smelting recommendations.
- **Auth**: None
- **Request Body**:
  ```json
  {
    "imageUrl": "https://example.com/copper.jpg",
    "deviceName": "Pure copper wire armature windings"
  }
  ```
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Device classified successfully.",
    "data": {
      "deviceCategory": "Copper Wire & Windings",
      "confidenceScore": 99.2,
      "estimatedValue": "₹700 – ₹780 / kg",
      "material": "99.9% Electrolytic Copper",
      "disposalRecommendation": "Schedule dealer collection for pure copper extraction.",
      "suggestedRecyclingMethod": "Direct Smelting & Electrolytic Refining",
      "recyclableComponents": ["Pure Copper Core", "PVC Insulation"]
    }
  }
  ```

---

## 4. Scrap Marketplace Listings Endpoints

### `GET /api/ewaste` (or `GET /api/ewaste/list`)
- **Purpose**: Fetches active marketplace scrap listings with optional category, city, and status filtering.
- **Auth**: None (Public Read)
- **Query Params**:
  - `category` (optional, string)
  - `city` (optional, string)
  - `status` (optional, default: `AVAILABLE`)
- **Success (200 OK)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "ew_101",
        "deviceName": "Old Washing Machine Heavy Scrap (Steel Drum & Motor)",
        "brand": "IFB / Bosch",
        "category": "Appliances",
        "condition": "Non-working / Damaged",
        "estimatedAge": "6 years",
        "price": "₹1,800",
        "weightKg": 45.0,
        "sellerName": "Rajesh Kumar",
        "sellerCity": "Coimbatore",
        "sellerPhone": "9876543210",
        "sellerAddress": "Eachanari Road, Coimbatore",
        "status": "AVAILABLE"
      }
    ]
  }
  ```

---

### `POST /api/ewaste/create`
- **Purpose**: Publishes a new scrap listing to the live marketplace with seller contact and GPS coordinates.
- **Auth**: None (Supports guest & registered sellers)
- **Request Body**:
  ```json
  {
    "deviceName": "Old Washing Machine Scrap",
    "brand": "IFB",
    "category": "Appliances",
    "condition": "Non-working / Damaged",
    "estimatedAge": "6 years",
    "description": "Intact copper motor and steel drum.",
    "price": "₹1,800",
    "estimatedWeight": "45.0",
    "sellerName": "Rajesh Kumar",
    "sellerCity": "Coimbatore",
    "sellerPhone": "9876543210",
    "sellerAddress": "Eachanari Road, Coimbatore",
    "sellerState": "Tamil Nadu",
    "sellerPincode": "641021",
    "latitude": "10.932920",
    "longitude": "76.977080"
  }
  ```
- **Success (201 Created)**:
  ```json
  {
    "success": true,
    "message": "E-Waste scrap item published to Live Marketplace successfully!",
    "data": {
      "id": "ew_1730000000",
      "deviceName": "Old Washing Machine Scrap",
      "status": "AVAILABLE",
      "createdAt": "2026-10-26T14:20:00.000Z"
    }
  }
  ```

---

## 5. Doorstep Pickup & Logistics Endpoints

### `POST /api/pickup/create`
- **Purpose**: Creates a scheduled doorstep scrap pickup request.
- **Auth**: Session Cookie or Bearer Token
- **Request Body**:
  ```json
  {
    "deviceName": "Old Washing Machine Scrap",
    "category": "Appliances",
    "pickupDate": "2026-11-05",
    "timeSlot": "10:00 AM – 01:00 PM",
    "address": "Flat 402, Green Park Apartments, Eachanari",
    "city": "Coimbatore",
    "district": "Coimbatore",
    "pinCode": "641021",
    "estimatedWeight": 45.0,
    "contactMethod": "SMS & Call"
  }
  ```
- **Success (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Doorstep pickup scheduled successfully.",
    "pickup": {
      "id": "pk_1730000000",
      "requestId": "REQ-2026-8812",
      "status": "SUBMITTED",
      "priority": "NORMAL",
      "rewardPoints": 450
    }
  }
  ```

---

### `GET /api/pickup/history`
- **Purpose**: Retrieves all past and active pickup requests for the authenticated user.
- **Auth**: Required
- **Success (200 OK)**: `{ "success": true, "pickups": [ ... ] }`

---

### `GET /api/pickup/status`
- **Purpose**: Queries pickup tracking details by request ID.
- **Query Params**: `?requestId=REQ-2026-8812`
- **Success (200 OK)**: `{ "success": true, "status": "ASSIGNED", "driver": "Murugan S.", "eta": "15 mins" }`

---

### `PATCH /api/pickup/update`
- **Purpose**: Updates pickup status (`COLLECTED`, `COMPLETED`, `CANCELLED`).
- **Auth**: Officer / Recycler Role Required
- **Request Body**: `{ "requestId": "REQ-2026-8812", "status": "COMPLETED" }`
- **Success (200 OK)**: `{ "success": true, "message": "Pickup status updated successfully." }`

---

## 6. Rewards, Recycling Centers & Notifications Endpoints

### `GET /api/rewards`
- **Purpose**: Retrieves unlocked rewards, EcoCoins balance, and available discount vouchers.
- **Auth**: Required
- **Success (200 OK)**: `{ "success": true, "ecoCoins": 1250, "unlockedVouchers": [ ... ] }`

---

### `GET /api/centers`
- **Purpose**: Fetches CPCB-authorized recycling centers with GPS coordinates and capacity ratings.
- **Query Params**: `?city=Coimbatore&radius=10`
- **Success (200 OK)**: `{ "success": true, "centers": [ ... ] }`

---

### `GET /api/certificates`
- **Purpose**: Returns green disposal certificates with calculated CO2 reduction metrics.
- **Auth**: Required
- **Success (200 OK)**: `{ "success": true, "certificates": [ ... ] }`

---

### `GET /api/notifications`
- **Purpose**: Retrieves system notices, pickup status alerts, and bid proposals.
- **Auth**: Required
- **Success (200 OK)**: `{ "success": true, "notifications": [ ... ] }`

---

## 7. Admin & Officer Operations Endpoints

- `GET /api/admin/dashboard`: Platform KPIs (total scrap weight, active dealers, CO2 offset).
- `GET /api/admin/pickups`: Global pickup dispatch table.
- `GET /api/admin/recyclers`: Verified recycler compliance registry.
- `GET /api/admin/reports`: CPCB annual compliance e-waste returns.
- `GET /api/admin/users`: User management and role assignment.
- `POST /api/officer/assign`: Dispatches collection van to specific pickup stops.
- `GET /api/officer/dashboard`: Duty zone metrics and route tracking.
- `POST /api/officer/update-status`: Modifies inspection status and weight verification.

---

## 8. Backend Express Microservice Endpoints (Port 5000)

- `GET /api/health`: Service health check (`{ "status": "OK", "service": "EcoRoute REST API" }`).
- `GET /api/items`: E-waste scrap catalogue query.
- `POST /api/users/register`: Express microservice registration with JWT.
- `POST /api/rewards/calculate`: Microservice EcoCoins calculator via AI reward engine.
- `POST /api/priority/calculate`: Microservice priority classifier (`Critical`, `High`, `Medium`, `Low`).
