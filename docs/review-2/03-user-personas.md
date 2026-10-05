# 03 — Grounded User Personas

**Project**: EcoRoute — AI-Powered Scrap Marketplace  
**Milestone**: Review 2 Deliverable  
**Standard**: Archetypal Composite Personas Grounded in Operational Realities (Zero Fabricated Personal Identity)

---

## 1. Overview & Methodological Framing

User personas in EcoRoute are structured archetypes derived from direct operational observations of the Indian scrap recycling ecosystem. In accordance with the **Zero Fabrication Standard**, these personas represent composite behavioural archetypes rather than fabricated individuals with invented names, fake addresses, or fictional quotes.

The two core personas are:
1. **Primary Persona**: The Local Scrap Shop Owner / Small Yard Operator
2. **Secondary Persona**: The Urban / Suburban Household Scrap Seller

---

## 2. Persona 1: Local Scrap Shop Owner / Dealer (Primary Persona)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ARCHETYPE: "The High-Turnover Local Scrap Dealer"                       │
│ Category: Micro-Enterprise Scrap Merchant & Aggregator                 │
│ Operational Hub: Neighborhood Yard / Godown (Coimbatore / Urban Tier-2) │
│ Experience: 8+ years running family scrap trade                        │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Profile Summary
Operates a 400–800 sq.ft. roadside scrap shop and sorting yard. Employs 2–3 collection assistants who operate a 3-wheeler auto-loader (e.g., Piaggio Ape or Tata Ace). Serves a 3–7 km neighborhood radius. Handles 300–800 kg of mixed scrap daily (iron, copper wires, aluminium utensils/extrusions, unserviceable washing machines, batteries, cardboard).

### 2.2 Goals & Motivations
- **Maximize High-Value Metal Intake**: Acquire denser, high-margin materials (copper coils, aluminium scrap, heavy appliance chassis, intact batteries) rather than low-value bulk paper.
- **Minimize Vehicle Fuel & Idling Costs**: Consolidate pickups into geographically contiguous circuits to prevent dead-mileage.
- **Maintain High Inventory Turnover**: Avoid hoarding depreciating items; liquidate sorted scrap to wholesale smelters/aggregators within 48–72 hours.
- **Sustain Neighborhood Dominance**: Build direct, reliable relationships with households and small repair workshops without paying intermediary commissions.

### 2.3 Technology Comfort & Device Usage
- **Device**: Android smartphone (sub-₹15,000 range), running Android 12+.
- **Active Apps**: WhatsApp (heavily used for photo exchange and location pins), Google Pay / PhonePe (QR code payments at counter), YouTube, Voice Typing.
- **Language Preference**: Regional language (Tamil / Hindi / Marathi) with intuitive visual icons and numerals. Prefers large touch targets and voice inputs over lengthy text forms.

### 2.4 Daily Activities & Operational Timeline
```mermaid
timeline
    title Typical Daily Schedule of Local Scrap Dealer
    07:30 - 09:00 : Shop opening, checking overnight commodity scrap prices (Mandi rates), setting daily buy rates
    09:00 - 12:30 : Dispatching loader vehicle, fielding incoming customer calls, roving pickup trips
    12:30 - 14:00 : Unloading morning collections, preliminary sorting (stripping insulation, magnet testing)
    14:00 - 17:30 : Receiving walk-in sellers, weighing items on digital platform scale, paying via cash/UPI
    17:30 - 19:30 : Final sorting, baling cardboard, storing non-ferrous metals in secure godown, ledger entry
```

### 2.5 Frustrations & Pain Points
- **Unverified Scrap Calls**: Driving 4 km across heavy traffic for a reported "appliance collection" only to discover a plastic toy with ₹20 scrap value.
- **Doorstep Haggling Over Valuation**: Sellers expecting retail second-hand appliance prices rather than scrap material weight prices.
- **Circuitous Driving Routes**: Collection drivers criss-crossing the same neighborhood multiple times in an afternoon due to lack of trip batching.
- **Inaccurate Weight Expectations**: Customers claiming items weigh "at least 30 kg" when physical weighing reveals under 12 kg.

### 2.6 Current Workflow vs Desired EcoRoute Workflow

```mermaid
flowchart TD
    subgraph Current_Workflow ["Current As-Is Workflow"]
        A1[Receive Phone Call or Customer Visit] --> B1[Verbally Ask for Item Description]
        B1 --> C1[Dispatch Driver Blindly without Route Planning]
        C1 --> D1[Arrive at Doorstep & Inspect Item]
        D1 --> E1[Long Argument Over Scrap Price vs Appliance Price]
        E1 --> F1[Manual Weighing & Cash Transaction]
        F1 --> G1[Return to Yard via Congested Route]
    end

    subgraph Desired_Workflow ["Desired EcoRoute Workflow"]
        A2[Check EcoRoute Nearby Listings Feed (5 km)] --> B2[Inspect AI Identification, Photo & Estimated Weight]
        B2 --> C2[Accept 3 Grouped Listings in Same Ward]
        C2 --> D2[System Sequences AI-Optimized Collection Route]
        D2 --> E2[Arrive at Verified Seller Doorstep with Agreed Token Price]
        E2 --> F2[Swift Digital/Cash Settlement via Scannable UPI]
        F2 --> G2[Complete 3 Pickups Saving 30%+ Travel Time & Fuel]
    end
```

---

## 3. Persona 2: Household Scrap Seller (Secondary Persona)

```text
┌────────────────────────────────────────────────────────────────────────┐
│ ARCHETYPE: "The Clutter-Conscious Urban Household"                     │
│ Category: Working Professional / Urban Family                          │
│ Residence: Multi-storey apartment or independent home (Coimbatore)     │
│ Behavior: Disposes of bulk scrap 1–2 times per year                    │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Profile Summary
Lives in a 3-bedroom apartment with working spouse and children. Over the past 3 years, the household has accumulated obsolete electronics, a broken washing machine, old copper wiring from a renovation, discarded ceiling fans, and stacked delivery boxes.

### 3.2 Goals & Motivations
- **Declutter Living Space**: Reclaim valuable balcony and storage utility areas from bulky, dirty junk.
- **Fair & Transparent Return**: Get an honest, benchmarked financial return for items without being exploited on rigged mechanical scales.
- **Frictionless Doorstep Collection**: Avoid having to carry heavy 40+ kg appliances down elevators or transport them in personal cars.
- **Environmental Responsibility**: Ensure hazardous electronic components and batteries are recycled through compliant channels rather than dumped in landfills.

### 3.3 Technology Comfort & Device Usage
- **Device**: Mid-to-high-end smartphone (iOS or Android).
- **Active Apps**: Swiggy/Zomato, Amazon, Uber, WhatsApp, UPI payment apps.
- **Expectation**: Expects intuitive, instantaneous mobile-first digital experiences with clean camera integration, map-based tracking, and transparent status notifications.

### 3.4 Frustrations & Pain Points
- **Unreliable Informal Collectors**: Street scrap collectors arrive erratically during office hours when nobody is home.
- **Scale Manipulation Skepticism**: Suspicion that informal spring scales are under-weighing scrap items by 20–30%.
- **Zero Visibility on Fair Market Scrap Rates**: Not knowing whether an old washing machine scrap is worth ₹300 or ₹2,500.
- **Physical Exertion & Logistics**: Inability to move heavy cast-iron or stainless steel items without specialized labor.

### 3.5 Current Workflow vs Desired EcoRoute Workflow

| Dimension | Current As-Is Behavior | Desired EcoRoute Workflow |
| :--- | :--- | :--- |
| **Trigger** | Balcony clutter reaches breaking point during annual festival cleaning. | Snaps a quick photo whenever an appliance breaks down or wire is replaced. |
| **Valuation** | No benchmark; guesses or accepts arbitrary low offer from street hawker. | Gemini AI instantly classifies device, weight range, and indicative price token. |
| **Coordination** | Searches for scrapshop numbers, calls, waits indefinitely. | Publishes listing in 1 click; nearby dealers bid or request scheduled pickup. |
| **Payment** | Cash haggling at door; often lacking change. | Direct UPI transfer or Green Coins convertible to electricity bill rebates. |
| **Disposal Trust** | High suspicion of open burning or improper dumping. | Receives verified recycler token ensuring safe recovery of precious metals. |

---

## 4. Persona Synthesis & Design Mandate

The juxtaposition of these two personas reveals that **EcoRoute must not be built as an abstract e-commerce platform**, but rather as a **localized logistical matchmaker**:

1. **For the Scrap Dealer**: Provide clarity on *material, approximate weight, and geographic proximity* before vehicle departure, paired with *automated route sequencing* to preserve profitability.
2. **For the Household Seller**: Provide *effortless camera-based AI estimation*, *verified dealer credentials*, and *scheduled doorstep collection* to eliminate physical and cognitive friction.

---

*Document Status: Verified Baseline · Zero Fabricated Data Standard · Ready for Review 2 Evaluation*
