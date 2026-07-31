# EcoRoute Platform Architecture & System Design

EcoRoute is an AI-powered e-waste management platform engineered following microservice principles and monorepo code organization.

```
                  +-----------------------------------+
                  |         React / Next.js           |
                  |       Frontend Application        |
                  +-----------------+-----------------+
                                    |
                                    | REST API (JSON / JWT)
                                    v
                  +-----------------------------------+
                  |        Node.js / Express          |
                  |          Backend API              |
                  +-----------------+-----------------+
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
            v                       v                       v
    +---------------+       +---------------+       +---------------+
    |  JWT Auth &   |       |  Winston Log  |       |  Supabase /   |
    |  Role Control |       |  Streamer     |       |  PostgreSQL   |
    +---------------+       +---------------+       +---------------+
```

## System Components

1. **Frontend Presentation Layer (`frontend/`)**:
   - Built with React 18, Next.js App Router, Framer Motion, and Tailwind CSS.
   - Implements code splitting and route-based lazy loading.

2. **Backend Services Layer (`backend/`)**:
   - Express REST API with Winston logging, JWT authorization, and input validation middleware.
   - Controllers handle Citizen, Buyer, Recycler, and Admin workflows.

3. **Data & Persistence Layer**:
   - Supabase cloud PostgreSQL database with Prisma ORM.

4. **Containerization & CI/CD**:
   - Docker & Docker Compose setup for deployment.
   - GitHub Actions automated testing pipeline (`.github/workflows/ci.yml`).
