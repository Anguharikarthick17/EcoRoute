# 06 — Error Boundaries, System Resilience & Fault-Tolerance Strategy

**Project**: EcoRoute — AI-Powered Scrap Marketplace  
**Milestone**: Review 3 Error Boundary Strategy  
**Evaluation Rubric Alignment**: Granular Technical Documentation on Error Boundaries  

---

## 1. Multi-Tier Error Architecture

EcoRoute implements a multi-tier resilience architecture designed to prevent unhandled runtime exceptions from breaking the user interface or exposing sensitive infrastructure details:

```mermaid
flowchart TD
    subgraph UI ["User Interface Layer (Next.js 16 App Router)"]
        A["Root Layout Crash"] --> B["app/global-error.tsx\n(Full HTML/Body Fallback)"]
        C["Page / Component Crash"] --> D["app/error.tsx\n(Segment Recovery + Retry)"]
        E["Dealer Hub Failure"] --> F["app/buyer/error.tsx\n(Preserve Dealer Session)"]
        G["Citizen Upload Failure"] --> H["app/dashboard/error.tsx\n(Camera Scan Retry)"]
        I["Missing Route / ID"] --> J["app/not-found.tsx\n(CPCB 404 Component)"]
        K["Page Transition"] --> L["app/loading.tsx\n(Zero-CLS Skeleton)"]
    end

    subgraph API ["Serverless & Microservice API Layer"]
        M["API Request Inbound"] --> N{"Validation Check\n(Zod Schema)"}
        N -- "Invalid" --> O["HTTP 400 Bad Request\n(Field-Level Error Array)"]
        N -- "Valid" --> P{"Service Execution"}
        P -- "AI Provider Timeout" --> Q["Fallback Heuristics\n(Zero-Downtime Valuation)"]
        P -- "Database / Network Error" --> R["Sanitized HTTP 500\n(Credentials & Paths Masked)"]
        P -- "Success" --> S["HTTP 200/201 Success Response"]
    end
```

---

## 2. App Router Error Boundaries

### 1. Root Segment Error Boundary (`app/error.tsx`)
- **Scope**: Catches unhandled client-side and server-rendered component crashes across standard application routes.
- **Recovery Strategy**:
  - Displays a clean alert box with an optional error digest tracking ID (`error.digest`).
  - Provides a primary `<button onClick={() => reset()}>Try Again</button>` that re-renders the current segment without forcing a hard browser refresh.
  - Provides a secondary fallback link to `/` (Home).
- **Diagnostics**: Logs `[EcoRoute App Error Boundary]: error.message` to server console without rendering raw stack traces in the client DOM.

### 2. Root Global Error Boundary (`app/global-error.tsx`)
- **Scope**: Catches critical rendering exceptions that occur inside the root `app/layout.tsx` itself.
- **Specification Compliance**: Defines its own `<html>` and `<body>` tags as mandated by Next.js App Router conventions.
- **User Experience**: Renders a clean system-level recovery dialog with a "Reload System" button.

### 3. Scrap Dealer Portal Error Boundary (`app/buyer/error.tsx`)
- **Scope**: Protects the scrap merchant operations dashboard (`/buyer`).
- **Domain Resilience**:
  - Catches calculation errors in radius filters or route sequencing.
  - Ensures local authentication state (`localStorage.getItem("ecoroute_user")`) is not destroyed during component recovery.
  - Displays a dedicated "Refresh Marketplace" button.

### 4. Household Citizen Portal Error Boundary (`app/dashboard/error.tsx`)
- **Scope**: Protects the household upload workflow and Gemini AI camera appraisal scanner (`/dashboard/upload`).
- **Domain Resilience**:
  - Catches canvas resizing errors, base64 data conversion exceptions, or camera viewfinder permissions failures.
  - Offers a dedicated "Return to AI Scanner" button and fallback instructions for uploading lower-resolution photos.

### 5. Accessible Loading State (`app/loading.tsx`)
- **Scope**: Automatically displayed by Next.js during asynchronous page data transitions.
- **Features**: Dual-ring emerald spinner, zero Cumulative Layout Shift (CLS), and accessibility markup (`role="status"`, screen-reader text `sr-only`).

---

## 3. API Error Sanitization & Data Masking (`lib/api-response.ts`)

To eliminate information disclosure vulnerabilities, all API endpoints route failure responses through `errorResponse()` in `lib/api-response.ts`:

### 1. Database Connection & Credential Masking
- **Vulnerability Prevented**: Prisma or PostgreSQL driver errors often echo connection URIs (`postgresql://user:pass@host:5432/db`) in error messages.
- **Sanitization Mechanism**:
  ```ts
  const isSensitive =
    msg.includes("DATABASE_URL") ||
    msg.includes("prisma") ||
    msg.includes("password") ||
    msg.includes("secret") ||
    msg.includes("/Users/") ||
    msg.includes("/home/");
  ```
- **Client Output**: Replaced with generic safe message (`"An unexpected error occurred. Please try again later."` or `"Database error"`).
- **Server Output**: Full diagnostic logged safely to server terminal for debugging.

### 2. Zod Schema Validation Mapping
- Formats validation failures into structured HTTP 400 responses:
  ```json
  {
    "success": false,
    "message": "Validation failed for provided input.",
    "code": "VALIDATION_ERROR",
    "errors": [
      { "path": ["email"], "message": "Invalid email address format" }
    ]
  }
  ```

---

## 4. Failure Mode Handling Across Subsystems

| Subsystem / Scenario | Failure Trigger | Handled Behavior & Fallback Mechanism | User Experience Impact |
| :--- | :--- | :--- | :--- |
| **Gemini Vision AI Service** | Google AI Studio rate limit, network timeout, or missing `GEMINI_API_KEY`. | Falls back automatically to local multi-feature image heuristics in `lib/ai.ts` and baseline classification in `backend/src/ai/gemini.js`. | **Zero User Downtime**: User receives instant benchmark scrap appraisal; UI displays standard approximation badge. |
| **Non-Scrap Photo Upload** | User uploads selfie, food, animal, or irrelevant image. | Detected via keyword and visual density filtering; sets `isRealScrap: false`, `authenticityScore: 18.5`, and explanatory warning. | User is prompted to upload a clear photo of recyclable metal, appliance, or e-waste. Marketplace integrity preserved. |
| **Supabase Remote Outage** | Supabase database unreachable or network request times out. | `lib/ewaste-store.ts` employs `Promise.race` with an 800ms timeout, falling back seamlessly to persistent in-memory mock store. | Listings remain fully browsable; dealer dashboard displays cached marketplace items without spinning indefinitely. |
| **Malformed JSON Payload** | Client sends corrupted or non-JSON body to API endpoint. | Handled via `.catch(() => null)` in route handlers; returns clean HTTP 400 with `Invalid JSON payload`. | Safe rejection without unhandled Node server crashes. |
| **Unauthenticated Route Access** | Request missing valid JWT session token or cookie. | `lib/auth.ts` verify returns `null`; endpoint returns HTTP 401 Unauthorized. | Clean redirect to `/login` without exposing server internal logic. |
