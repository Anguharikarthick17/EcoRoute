import sys
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # We don't draw running header on cover page (page 1)
        if self._pageNumber > 1:
            # Header line
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.75)
            self.line(40, 800, 555, 800)
            
            # Header text
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#064e3b"))
            self.drawString(40, 806, "EcoRoute — AI-Powered E-Waste Management Platform")
            
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(555, 806, "Full System Documentary & Technical Specifications")

        # Footer (drawn on all pages)
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(40, 45, 555, 45)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(40, 32, "Confidential & Technical Reference — Government CPCB Standard Platform")
        
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(555, 32, page_text)
        
        self.restoreState()


def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Palette
    c_primary = colors.HexColor("#064e3b")      # Deep Emerald Green
    c_secondary = colors.HexColor("#0d9488")    # Teal Accent
    c_dark = colors.HexColor("#0f172a")         # Dark Slate
    c_body = colors.HexColor("#334155")         # Body text
    c_bg_light = colors.HexColor("#f8fafc")     # Light background box
    c_accent_bg = colors.HexColor("#ecfdf5")   # Light green box
    c_border = colors.HexColor("#cbd5e1")      # Border gray
    
    # Custom Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=c_primary,
        spaceAfter=8
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=c_secondary,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=c_primary,
        spaceBefore=16,
        spaceAfter=10,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=c_dark,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=c_body,
        spaceAfter=8
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        parent=body_style,
        fontName='Helvetica-Bold',
        textColor=c_dark
    )
    
    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=body_style,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1e293b"),
        backColor=colors.HexColor("#f1f5f9"),
        borderColor=colors.HexColor("#cbd5e1"),
        borderWidth=0.5,
        borderPadding=6,
        spaceAfter=8,
        spaceBefore=4
    )
    
    callout_style = ParagraphStyle(
        'Callout_Text',
        parent=body_style,
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#065f46")
    )
    
    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=c_body
    )
    
    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=c_dark
    )

    table_cell_header = ParagraphStyle(
        'TableCellHeader',
        parent=table_cell,
        fontName='Helvetica-Bold',
        textColor=colors.white
    )

    story = []
    
    # ---------------------------------------------------------
    # COVER / HEADER BANNER
    # ---------------------------------------------------------
    story.append(Spacer(1, 10))
    story.append(Paragraph("🌿 EcoRoute — AI-Powered E-Waste Platform", title_style))
    story.append(Paragraph("Complete Technical Documentary, Architecture Blueprint & Step-by-Step Implementation Guide", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=c_primary, spaceBefore=0, spaceAfter=12))
    
    # Metadata Info Box
    meta_data = [
        [
            Paragraph("<b>Project Name:</b> EcoRoute Enterprise Monorepo", table_cell),
            Paragraph("<b>Compliance:</b> CPCB & MoEFCC Standard", table_cell)
        ],
        [
            Paragraph("<b>Primary Tech:</b> Next.js 16, Express, Gemini AI, PostgreSQL", table_cell),
            Paragraph("<b>Document Version:</b> 1.0 (Production Blueprint)", table_cell)
        ],
        [
            Paragraph("<b>Author/Maintainer:</b> Anguharikarthick17", table_cell),
            Paragraph("<b>Deployment Target:</b> Docker, Netlify, Cloud Infrastructure", table_cell)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[255, 260])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_accent_bg),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#a7f3d0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#6ee7b7")),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))
    
    # ---------------------------------------------------------
    # EXECUTIVE SUMMARY
    # ---------------------------------------------------------
    story.append(Paragraph("1. Executive Summary & Core Mission", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    
    exec_summary_text = (
        "<b>EcoRoute</b> is a state-of-the-art, AI-powered e-waste management and recycling marketplace platform built "
        "in strict accordance with the <b>Government of India Central Pollution Control Board (CPCB)</b> and "
        "<b>Ministry of Environment, Forest and Climate Change (MoEFCC) E-Waste Management Rules 2022</b>. "
        "The platform bridges the gap between individual citizens, informal scrap collectors, certified e-waste recyclers, "
        "and government regulatory bodies. By combining computer vision AI scrap valuation, instant green currency (Green Coins) "
        "incentives, direct utility bill (Electricity/Water) redemptions, and real-time buyer pickup intimation, EcoRoute "
        "establishes a sustainable, formal circular economy for electronic waste."
    )
    story.append(Paragraph(exec_summary_text, body_style))
    
    # Key Pillars Table
    pillars_data = [
        [Paragraph("Pillar", table_cell_header), Paragraph("Description & Engineering Implementation", table_cell_header)],
        [
            Paragraph("<b>🤖 AI Scrap Valuation</b>", table_cell_bold),
            Paragraph("Google Gemini 1.5/2.0 Flash Vision model auto-classifies e-waste category, brand, weight, physical condition, and computes real-time scrap price.", table_cell)
        ],
        [
            Paragraph("<b>⚡ Utility Bill Rebates</b>", table_cell_bold),
            Paragraph("Citizen Green Coins redeemable 1:1 for instant UPI Cash, Electricity (EB) bill discounts, and Municipal Water bill waivers.", table_cell)
        ],
        [
            Paragraph("<b>🚛 Recycler Intimation</b>", table_cell_bold),
            Paragraph("Certified buyers filter scrap listings by city/category, select pickup date & time slot, generate CPCB compliant tokens, and launch direct GPS turn-by-turn navigation.", table_cell)
        ],
        [
            Paragraph("<b>🌐 Multilingual i18n</b>", table_cell_bold),
            Paragraph("Seamless real-time translation context supporting 8 major Indian languages (English, Tamil, Hindi, Telugu, Marathi, Bengali, Kannada, Gujarati).", table_cell)
        ],
        [
            Paragraph("<b>🔒 Permanent Security</b>", table_cell_bold),
            Paragraph("JWT + Bcrypt authentication, strict role-based access control (Citizen vs. Recycler), cross-device persistent account storage, and zero-session loss design.", table_cell)
        ]
    ]
    pillars_table = Table(pillars_data, colWidths=[130, 385])
    pillars_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(pillars_table)
    story.append(Spacer(1, 14))

    # ---------------------------------------------------------
    # SECTION 2: WHAT WE HAVE USED (TECH STACK & DEPENDENCIES)
    # ---------------------------------------------------------
    story.append(Paragraph("2. Complete Technology Stack & Tools Used", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    
    tech_intro = (
        "EcoRoute is engineered as a modern enterprise monorepo housing a Next.js 16 presentation layer, "
        "an Express Node.js microservices backend, PostgreSQL persistence managed via Prisma ORM, "
        "and Google Gemini AI vision capabilities. Below is the comprehensive breakdown of every tool, library, and framework utilized:"
    )
    story.append(Paragraph(tech_intro, body_style))

    # Tech Stack Category Table
    tech_stack_data = [
        [Paragraph("Category", table_cell_header), Paragraph("Technologies & Version Specs", table_cell_header), Paragraph("Purpose in EcoRoute", table_cell_header)],
        
        # Frontend
        [
            Paragraph("<b>Frontend Core</b>", table_cell_bold),
            Paragraph("<b>Next.js 16.2.12</b> (App Router)<br/><b>React 19.2.4</b><br/><b>TypeScript 5.x</b>", table_cell),
            Paragraph("High-performance server & client component architecture, SSR, SEO optimizations, and file-based App Router routing.", table_cell)
        ],
        [
            Paragraph("<b>Styling & UI</b>", table_cell_bold),
            Paragraph("<b>Tailwind CSS v4</b><br/><b>Framer Motion 12.43</b><br/><b>React Icons / Lucide</b>", table_cell),
            Paragraph("Responsive glassmorphism UI design, smooth 60fps micro-animations, theme tokens, and clean Government portal aesthetics.", table_cell)
        ],
        [
            Paragraph("<b>AI Vision Engine</b>", table_cell_bold),
            Paragraph("<b>@google/generative-ai 0.24.1</b><br/>(Gemini 1.5 / 2.0 Flash)<br/>HTML5 Canvas Compression", table_cell),
            Paragraph("AI image recognition of e-waste device category, brand, condition rating, and automated valuation pricing formula.", table_cell)
        ],
        
        # Backend & REST API
        [
            Paragraph("<b>Backend REST API</b>", table_cell_bold),
            Paragraph("<b>Node.js v18+ / v20</b><br/><b>Express 4.19.2</b><br/><b>CORS, Dotenv</b>", table_cell),
            Paragraph("Microservices REST backend handling user management, scrap listing CRUD, priority queues, and pickup notifications on Port 5000.", table_cell)
        ],
        [
            Paragraph("<b>Logging & Tests</b>", table_cell_bold),
            Paragraph("<b>Winston 3.13.0</b><br/><b>Jest 29.7.0</b><br/><b>Supertest 6.3.4</b>", table_cell),
            Paragraph("Structured JSON log recording (HTTP requests & system errors) and unit/integration test suites.", table_cell)
        ],

        # Persistence
        [
            Paragraph("<b>Database & ORM</b>", table_cell_bold),
            Paragraph("<b>Supabase Cloud PostgreSQL</b><br/><b>Prisma ORM 7.9.1</b><br/>Browser Local Storage Engine", table_cell),
            Paragraph("Relational database schema, connection pooling, RLS data policies, and real-time cross-device local storage state fallback.", table_cell)
        ],

        # Security & Payment
        [
            Paragraph("<b>Auth & Security</b>", table_cell_bold),
            Paragraph("<b>jsonwebtoken 9.0.3</b><br/><b>bcryptjs 3.0.3 / 2.4.3</b><br/>Google OAuth Modal", table_cell),
            Paragraph("JWT bearer token authentication, bcrypt password hashing, permanent account persistence, and strict role guards.", table_cell)
        ],
        [
            Paragraph("<b>Payments & Maps</b>", table_cell_bold),
            Paragraph("Live GPay UPI QR (M ANGU)<br/>256-bit SSL Card Form<br/><b>Leaflet 1.9.4</b> & OpenStreetMap", table_cell),
            Paragraph("Instant UPI QR scanner matrix, simulated PCI-DSS card payment checkout, and interactive GPS recycling center map rendering.", table_cell)
        ],
        [
            Paragraph("<b>DevOps & CI/CD</b>", table_cell_bold),
            Paragraph("<b>Docker & Compose</b><br/><b>GitHub Actions CI</b><br/><b>Netlify (netlify.toml)</b>", table_cell),
            Paragraph("Containerized multi-service deployment (`backend:5000`, `frontend:3000`), automated CI build workflow, and fresh CDN deploys.", table_cell)
        ]
    ]
    
    tech_table = Table(tech_stack_data, colWidths=[110, 160, 245])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 14))

    # ---------------------------------------------------------
    # SECTION 3: WHAT WE HAVE DONE STEP-BY-STEP
    # ---------------------------------------------------------
    story.append(Paragraph("3. Step-by-Step Implementation Journey", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    
    journey_intro = (
        "The development of EcoRoute followed an iterative engineering workflow spanning repository architectural setup, "
        "backend REST microservice creation, AI computer vision integration, UI/UX Government portal compliance, "
        "buyer marketplace intimation workflow, real-time sync, and production CI/CD deployment. "
        "Below is the complete step-by-step documentation of all phases completed:"
    )
    story.append(Paragraph(journey_intro, body_style))

    steps = [
        (
            "Step 1: Monorepo System Architecture & Project Blueprinting",
            [
                "Established an enterprise monorepo workspace containing Next.js 16 (`app/`), Express backend (`backend/`), shared component library (`components/`), translation utilities (`lib/i18n.tsx`), and documentation (`docs/`).",
                "Configured root and backend `package.json` configurations with strict version locking for dependencies including `@google/generative-ai`, `@prisma/client`, `jsonwebtoken`, and `framer-motion`.",
                "Created `.env.example` templates and `.gitignore` rules to safeguard private API keys and database connection strings."
            ]
        ),
        (
            "Step 2: Relational Database Schema Design & Prisma Migration",
            [
                "Designed Supabase PostgreSQL relational schemas for `User`, `EWasteListing`, `Reward`, and `PriorityQueue` entities.",
                "Defined Prisma ORM schema (`prisma/schema.prisma`) mapping database tables and foreign key relationships.",
                "Created SQL migration scripts in `supabase/schema.sql` implementing Row Level Security (RLS) policies and automatic trigger functions."
            ]
        ),
        (
            "Step 3: Express REST API Microservices & Winston Logger",
            [
                "Built Node.js & Express REST API server listening on Port 5000 with route controllers (`userController`, `itemController`, `rewardController`, `priorityController`).",
                "Integrated **Winston** structured logging middleware (`logger.js`) capturing HTTP status codes, execution latencies, and stack traces.",
                "Developed Jest unit and integration test suites (`backend/src/tests`) to validate API endpoints."
            ]
        ),
        (
            "Step 4: AI Computer Vision & Automated Scrap Valuation Engine",
            [
                "Constructed Next.js serverless API endpoint `/api/ai/scan-image` interfacing with Google Gemini 1.5/2.0 Flash Vision AI.",
                "Implemented image recognition prompts returning structured JSON with authenticity verification (0-100%), device category, brand, estimated weight, and physical condition.",
                "Programmed automated pricing formula: Valuation = Base Category Rate x Weight (kg) x Physical Condition Multiplier."
            ]
        ),
        (
            "Step 5: Government Portal UI Redesign & 8-Language i18n System",
            [
                "Redesigned Navigation Bar into a compact 74px Government portal header featuring centered links, 44px official logo, 40px action buttons, and Tamil Nadu default location state auto-selection.",
                "Built full-scale i18n translation context (`lib/i18n.tsx`) supporting 8 Indian languages (English, Tamil, Hindi, Telugu, Marathi, Bengali, Kannada, Gujarati) with persistent local storage caching.",
                "Restyled Hero section with 60px primary headings, 520px body width, 46px CTA buttons, and 80px desktop left padding."
            ]
        ),
        (
            "Step 6: Modern Split-Layout Auth & Strict Role Enforcement",
            [
                "Transformed `/login` and `/register` pages into responsive 2-column split layouts featuring background video overlays, 4 feature highlight cards, and 52px form grid elements.",
                "Enforced strict role-based login validation blocking Citizen user accounts under Recycler tab and Recycler accounts under Citizen tab with clear error messages.",
                "Integrated **Sign in with Google** authentication button and interactive account selector modal for seamless onboarding."
            ]
        ),
        (
            "Step 7: Permanent User Session Persistence & Account Preservation",
            [
                "Eliminated standard 1-hour session expiration limits to preserve user registrations permanently across browser restarts and device restarts.",
                "Implemented persistent multi-user registration store (`ecoroute_all_registered_users`) in browser local storage synchronized across authentication tabs.",
                "Enabled automatic auto-login on registration completion to deliver zero-friction navigation."
            ]
        ),
        (
            "Step 8: Buyer Scrap Marketplace & Pickup Intimation Engine",
            [
                "Constructed Recycler Buyer marketplace (`/buyer`) displaying live citizen e-waste listings with category, city, price, and condition filtering.",
                "Created interactive Checkout Modal enabling buyers to select collection date, time slot (Morning / Afternoon / Evening), and intimation pickup messages.",
                "Integrated multi-channel payment gateway: Cash on Pickup, Live GPay UPI QR scanner (`M ANGU`, `batmanangu@okhdfcbank`), and PCI-DSS 256-bit SSL encrypted credit/debit card input.",
                "Engineered CPCB Purchase Token receipt generator and seller notification hub with direct Google Maps turn-by-turn directions to seller location."
            ]
        ),
        (
            "Step 9: Green Coins & Utility Bill Redemption Hub",
            [
                "Engineered Citizen Rewards Hub (`/dashboard/rewards`) awarding Green Coins upon e-waste recycling completion.",
                "Implemented multi-tier bill redemption system: Direct UPI Cash transfer, Electricity (EB) Bill rebates, Municipal Water bill waivers, and Eco Gift Cards.",
                "Calculated direct environmental savings metrics (CO2 avoided, lead diverted, tree equivalents earned)."
            ]
        ),
        (
            "Step 10: Zero-Fail Publishing, Cross-Device Sync & Netlify CI/CD",
            [
                "Implemented client-side image compression engine reducing camera capture payload sizes prior to form submission.",
                "Developed zero-fail publish handler (`/upload`) auto-sanitizing seller mobile numbers, auto-populating default fields, and syncing listings across browser tabs.",
                "Built cross-device server notification store for global multi-device order intimation delivery.",
                "Configured `docker-compose.yml` for multi-container orchestration, created GitHub Actions CI workflow (`ci-pipeline.yml`), and deployed `netlify.toml` for fresh production builds."
            ]
        )
    ]

    for title, bullet_list in steps:
        step_box = []
        step_box.append(Paragraph(f"<b>{title}</b>", h2_style))
        for b in bullet_list:
            step_box.append(Paragraph(f"• {b}", bullet_style))
        step_box.append(Spacer(1, 4))
        story.append(KeepTogether(step_box))

    story.append(Spacer(1, 10))

    # ---------------------------------------------------------
    # SECTION 4: REST API & DATABASE REFERENCE
    # ---------------------------------------------------------
    story.append(Paragraph("4. REST API & Database Reference", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    
    api_intro = "Below is the official API endpoint matrix for the EcoRoute REST API server (`http://localhost:5000/api`):"
    story.append(Paragraph(api_intro, body_style))

    api_table_data = [
        [Paragraph("Endpoint", table_cell_header), Paragraph("Method", table_cell_header), Paragraph("Auth Required", table_cell_header), Paragraph("Description / Action", table_cell_header)],
        [
            Paragraph("`/users/register`", table_cell_bold),
            Paragraph("<font color='green'><b>POST</b></font>", table_cell),
            Paragraph("No", table_cell),
            Paragraph("Register new Citizen, Recycler, or Official account with Bcrypt password hashing.", table_cell)
        ],
        [
            Paragraph("`/users/login`", table_cell_bold),
            Paragraph("<font color='green'><b>POST</b></font>", table_cell),
            Paragraph("No", table_cell),
            Paragraph("Authenticate user credentials, return JWT access token, and validate role access.", table_cell)
        ],
        [
            Paragraph("`/items`", table_cell_bold),
            Paragraph("<font color='blue'><b>GET</b></font>", table_cell),
            Paragraph("No", table_cell),
            Paragraph("Fetch all active e-waste scrap listings for marketplace display with category filters.", table_cell)
        ],
        [
            Paragraph("`/items`", table_cell_bold),
            Paragraph("<font color='green'><b>POST</b></font>", table_cell),
            Paragraph("Bearer JWT", table_cell),
            Paragraph("Publish new AI-valuated e-waste scrap listing into marketplace database.", table_cell)
        ],
        [
            Paragraph("`/items/:id/purchase`", table_cell_bold),
            Paragraph("<font color='green'><b>POST</b></font>", table_cell),
            Paragraph("Bearer JWT", table_cell),
            Paragraph("Recycler scrap purchase intimation, status update to SOLD, and CPCB token generation.", table_cell)
        ],
        [
            Paragraph("`/rewards/my-rewards`", table_cell_bold),
            Paragraph("<font color='blue'><b>GET</b></font>", table_cell),
            Paragraph("Bearer JWT", table_cell),
            Paragraph("Retrieve citizen Green Coin balance, accrued earnings, and bill redemption history.", table_cell)
        ],
        [
            Paragraph("`/api/ai/scan-image`", table_cell_bold),
            Paragraph("<font color='green'><b>POST</b></font>", table_cell),
            Paragraph("No", table_cell),
            Paragraph("Pass base64 scrap image payload to Gemini Vision AI for auto-classification & valuation.", table_cell)
        ]
    ]

    api_table = Table(api_table_data, colWidths=[120, 55, 80, 260])
    api_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(api_table)
    story.append(Spacer(1, 14))

    # Database Schema Table
    story.append(Paragraph("Database Entities Summary", h2_style))
    db_table_data = [
        [Paragraph("Entity Table", table_cell_header), Paragraph("Primary Key", table_cell_header), Paragraph("Key Fields", table_cell_header), Paragraph("Relationships & Purpose", table_cell_header)],
        [
            Paragraph("`users`", table_cell_bold),
            Paragraph("`id` (UUID)", table_cell),
            Paragraph("name, email, mobile, password_hash, role", table_cell),
            Paragraph("Stores citizen, recycler, and official profile accounts.", table_cell)
        ],
        [
            Paragraph("`ewaste_listings`", table_cell_bold),
            Paragraph("`id` (UUID)", table_cell),
            Paragraph("deviceName, brand, category, condition, price, sellerName, status", table_cell),
            Paragraph("Central repository of citizen scrap listings available for recycler pickup.", table_cell)
        ],
        [
            Paragraph("`rewards`", table_cell_bold),
            Paragraph("`id` (UUID)", table_cell),
            Paragraph("user_id, points, type (EARNED/EB_BILL/WATER), description", table_cell),
            Paragraph("FK to `users`. Tracks Green Coins balance and utility bill redemptions.", table_cell)
        ],
        [
            Paragraph("`priority_queue`", table_cell_bold),
            Paragraph("`id` (UUID)", table_cell),
            Paragraph("item_id, priorityLevel (HIGH/MED/LOW), hazardReason, status", table_cell),
            Paragraph("FK to `ewaste_listings`. Flags hazardous items (Lithium, Mercury) for priority government handling.", table_cell)
        ]
    ]
    db_table = Table(db_table_data, colWidths=[100, 75, 175, 165])
    db_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(db_table)
    story.append(Spacer(1, 14))

    # ---------------------------------------------------------
    # SECTION 6: LANGUAGES, FOLDER REFERENCE & WORKFLOW ARCHITECTURE
    # ---------------------------------------------------------
    story.append(Paragraph("6. Languages, Folder Reference & Workflow Architecture", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    
    story.append(Paragraph("A. Multilingual (i18n) Languages Reference Map (8 Languages)", h2_style))
    story.append(Paragraph("EcoRoute supports <b>8 Indian Languages</b>: English (en), Hindi (hi), Tamil (ta), Telugu (te), Marathi (mr), Bengali (bn), Kannada (kn), and Gujarati (gu).", body_style))
    story.append(Spacer(1, 6))

    i18n_table_data = [
        [Paragraph("Folder / File Path", table_cell_header), Paragraph("Responsibility & Function", table_cell_header), Paragraph("Key Symbol / Hook", table_cell_header)],
        [Paragraph("`lib/i18n.tsx`", table_cell_bold), Paragraph("Central multi-dictionary (`translations`), language context, and translation hook.", table_cell), Paragraph("`useTranslation()`", table_cell)],
        [Paragraph("`app/layout.tsx`", table_cell_bold), Paragraph("Global App Router wrapper injecting `<LanguageProvider>` across all pages.", table_cell), Paragraph("`<LanguageProvider>`", table_cell)],
        [Paragraph("`components/layout/Header.tsx`", table_cell_bold), Paragraph("Renders interactive top header language selection dropdown menu.", table_cell), Paragraph("`setLang(code)`", table_cell)],
        [Paragraph("`components/layout/Navbar.tsx`", table_cell_bold), Paragraph("Translates primary navigation menu links (`Home`, `Locate`, `Pickup`, `Services`).", table_cell), Paragraph("`t(\"nav.home\")`", table_cell)],
        [Paragraph("`components/sections/*`", table_cell_bold), Paragraph("Translates Hero banner, How It Works steps, Trust Badges, Stats, and Marketplace.", table_cell), Paragraph("`t(\"hero.title\")`", table_cell)],
        [Paragraph("`app/buyer/page.tsx`", table_cell_bold), Paragraph("Translates scrap buyer portal action buttons, search filters, and chat drawers.", table_cell), Paragraph("`t(\"buyer.order\")`", table_cell)]
    ]
    i18n_table = Table(i18n_table_data, colWidths=[150, 245, 120])
    i18n_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_accent_bg]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(i18n_table)
    story.append(Spacer(1, 10))

    story.append(Paragraph("B. Programming Languages & Tech Stack by Folder", h2_style))
    lang_table_data = [
        [Paragraph("Language", table_cell_header), Paragraph("Folder Path", table_cell_header), Paragraph("Purpose & Responsibilities", table_cell_header)],
        [Paragraph("TypeScript (`.ts`/`.tsx`)", table_cell_bold), Paragraph("`app/`, `components/`, `lib/`, `types/`, `hooks/`", table_cell), Paragraph("Next.js 16 App Router, React 19 UI components, AI vision engine (`lib/ai.ts`), and global stores.", table_cell)],
        [Paragraph("JavaScript (`.js`/`.mjs`)", table_cell_bold), Paragraph("`backend/src/`, `frontend/src/`", table_cell), Paragraph("Standalone Express.js microservice and Google Gemini 1.5 Flash AI integration (`gemini.js`).", table_cell)],
        [Paragraph("Prisma (`.prisma`)", table_cell_bold), Paragraph("`prisma/schema.prisma`", table_cell), Paragraph("PostgreSQL database schema defining 16 models, enums, relationships, and foreign keys.", table_cell)],
        [Paragraph("CSS (`.css`)", table_cell_bold), Paragraph("`app/globals.css`", table_cell), Paragraph("TailwindCSS 4 directives, glassmorphism utilities, dark mode tokens, and theme styles.", table_cell)],
        [Paragraph("JSON (`.json`)", table_cell_bold), Paragraph("`data/`, root directory", table_cell), Paragraph("Disk storage fallback for users (`users.json`), `package.json`, and TypeScript configuration.", table_cell)]
    ]
    lang_table = Table(lang_table_data, colWidths=[120, 140, 255])
    lang_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_dark),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(lang_table)
    story.append(Spacer(1, 14))

    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceBefore=10, spaceAfter=10))
    story.append(Paragraph("<i>End of Official Documentary — EcoRoute Project Engineering Reference</i>", ParagraphStyle('EndNote', parent=body_style, fontName='Helvetica-Oblique', alignment=1, textColor=colors.HexColor("#64748b"))))

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated PDF documentation: {filename}")

if __name__ == '__main__':
    output_path = "/Users/ahk/Desktop/EcoRoute/EcoRoute_Full_Documentation.pdf"
    if len(sys.argv) > 1:
        output_path = sys.argv[1]
    build_pdf(output_path)
