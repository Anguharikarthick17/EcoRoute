# EcoRoute Database Schema Documentation

EcoRoute utilizes a PostgreSQL relational database managed through Prisma ORM and Supabase cloud infrastructure.

## Data Models

### 1. User Model (`User`)
- `id` (String, Primary Key): Unique identifier (`u-xxx`).
- `name` (String): Full name of citizen, recycler, or official.
- `email` (String, Unique): Registered email address.
- `passwordHash` (String): Bcrypt hashed password.
- `role` (Enum): `CITIZEN`, `RECYCLER`, `OFFICER`, `ADMIN`.
- `createdAt` (DateTime): Registration timestamp.

### 2. E-Waste Listing Model (`EWasteListing`)
- `id` (String, Primary Key): Unique scrap item ID (`ew_xxx`).
- `deviceName` (String): Scrap device name.
- `brand` (String): Manufacturer brand.
- `category` (String): E-waste category.
- `condition` (String): Device physical/working condition.
- `price` (String): Valuation price in INR (₹).
- `sellerName` (String): Seller name.
- `sellerCity` (String): Seller location city.
- `status` (Enum): `AVAILABLE`, `BID_RECEIVED`, `SOLD`, `GOV_RESERVED`.
- `createdAt` (DateTime): Listing timestamp.

### 3. Reward Model (`Reward`)
- `id` (String, Primary Key): Reward transaction ID.
- `userId` (String, Foreign Key): Linked user ID.
- `points` (Int): Green Coins earned or redeemed.
- `title` (String): Description of activity or bill redemption.
- `createdAt` (DateTime): Transaction timestamp.

### 4. Priority Queue Model (`PriorityQueue`)
- `id` (String, Primary Key): Queue entry ID.
- `itemId` (String, Foreign Key): Linked e-waste item ID.
- `priorityLevel` (Enum): `HIGH`, `MEDIUM`, `LOW`.
- `reason` (String): Hazardous material declaration (e.g., Lithium Battery, Mercury CRT Glass).
- `status` (Enum): `QUEUED`, `IN_PROGRESS`, `RECYCLED`.
