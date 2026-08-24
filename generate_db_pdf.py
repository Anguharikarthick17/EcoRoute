import sys
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable, Preformatted
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
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.75)
            self.line(40, 800, 555, 800)
            
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#064e3b"))
            self.drawString(40, 806, "EcoRoute — PostgreSQL Prisma Database Specification")
            
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(555, 806, "Technical Reference & Data Schema")

        # Footer (All Pages)
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.75)
        self.line(40, 45, 555, 45)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(40, 32, "Official CPCB E-Waste Platform — Database Architecture & Schema")
        
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(555, 32, page_text)
        
        self.restoreState()


def build_database_pdf(filename, schema_path):
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
    
    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=22, leading=26,
        textColor=c_primary, spaceAfter=6
    )
    subtitle_style = ParagraphStyle(
        'DocSubtitle', parent=styles['Normal'],
        fontName='Helvetica', fontSize=11, leading=15,
        textColor=c_secondary, spaceAfter=15
    )
    h1_style = ParagraphStyle(
        'Heading1_Custom', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=14, leading=18,
        textColor=c_primary, spaceBefore=14, spaceAfter=6, keepWithNext=True
    )
    h2_style = ParagraphStyle(
        'Heading2_Custom', parent=styles['Normal'],
        fontName='Helvetica-Bold', fontSize=11, leading=15,
        textColor=c_dark, spaceBefore=10, spaceAfter=4, keepWithNext=True
    )
    body_style = ParagraphStyle(
        'Body_Custom', parent=styles['Normal'],
        fontName='Helvetica', fontSize=9, leading=13,
        textColor=c_body, spaceAfter=6
    )
    bullet_style = ParagraphStyle(
        'Bullet_Custom', parent=styles['Normal'],
        fontName='Helvetica', fontSize=8.5, leading=12,
        textColor=c_body, leftIndent=12, firstLineIndent=-8, spaceAfter=3
    )
    code_style = ParagraphStyle(
        'Code_Custom', parent=styles['Normal'],
        fontName='Courier', fontSize=7.5, leading=9.5,
        textColor=colors.HexColor("#1e293b")
    )
    table_header = ParagraphStyle('TH', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.white)
    table_cell = ParagraphStyle('TC', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=10, textColor=c_body)
    table_cell_bold = ParagraphStyle('TCB', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=c_dark)

    story = []

    # Title & Header Banner
    story.append(Paragraph("EcoRoute — Database Architecture & Schema Specification", title_style))
    story.append(Paragraph("Complete PostgreSQL Prisma Schema (16 Models, Enums, Relationships & Data Flow Explanation)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=0, spaceAfter=12))

    # SECTION 1: DATABASE OVERVIEW
    story.append(Paragraph("1. Executive Database Overview", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    overview_p1 = "The <b>EcoRoute</b> database architecture is built on top of <b>PostgreSQL</b> using <b>Prisma ORM</b> as the primary data abstraction layer. It defines <b>16 relational models</b>, <b>6 enums</b>, and strict foreign key constraints guaranteeing high data integrity for e-waste tracking, user identity management, doorstep collection dispatch, and CPCB regulatory compliance."
    story.append(Paragraph(overview_p1, body_style))
    
    db_features = [
        "<b>Primary Database:</b> PostgreSQL managed via Prisma ORM (`prisma/schema.prisma`).",
        "<b>Cloud Realtime Backup:</b> Supabase Client integration (`lib/supabase.ts`) for realtime notifications and cloud asset storage.",
        "<b>Offline Disk Fallback:</b> Local JSON storage (`data/users.json` & `lib/user-store.ts`) allowing demo execution without an active database URL.",
        "<b>Primary Keys:</b> Universally Unique Identifiers (UUID v4) across all tables (`@default(uuid())`).",
        "<b>Cascading Deletes:</b> Automatic relational cleanup on profile, e-waste items, rewards, and notification deletions (`onDelete: Cascade`)."
    ]
    for feat in db_features:
        story.append(Paragraph(f"• {feat}", bullet_style))
    story.append(Spacer(1, 10))

    # SECTION 2: ENUMS BREAKDOWN
    story.append(Paragraph("2. Database Enums Reference", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    
    enum_data = [
        [Paragraph("Enum Name", table_header), Paragraph("Allowed Values", table_header), Paragraph("Business Purpose & Scope", table_header)],
        [Paragraph("`Role`", table_cell_bold), Paragraph("CITIZEN, OFFICER, ADMIN", table_cell), Paragraph("Role-based access control (Citizens, Field Officers, Central Admins).", table_cell)],
        [Paragraph("`PickupStatus`", table_cell_bold), Paragraph("SUBMITTED, APPROVED, ASSIGNED, COLLECTED, DELIVERED, RECYCLED, COMPLETED, CANCELLED", table_cell), Paragraph("8-stage lifecycle tracking for doorstep e-waste collection requests.", table_cell)],
        [Paragraph("`Priority`", table_cell_bold), Paragraph("NORMAL, HIGH, URGENT, CRITICAL", table_cell), Paragraph("Urgency tagging for hazardous items and dumping complaints.", table_cell)],
        [Paragraph("`HazardLevel`", table_cell_bold), Paragraph("LOW, MODERATE, HIGH, CRITICAL", table_cell), Paragraph("Environmental hazard rating based on battery/mercury content.", table_cell)],
        [Paragraph("`NotificationType`", table_cell_bold), Paragraph("PICKUP, NOTICE, REWARD, REMINDER, SYSTEM", table_cell), Paragraph("Classification for system alerts and activity notifications.", table_cell)],
        [Paragraph("`ComplaintStatus`", table_cell_bold), Paragraph("OPEN, IN_PROGRESS, RESOLVED, ESCALATED", table_cell), Paragraph("Grievance tracking for illegal e-waste dumping reports.", table_cell)]
    ]
    enum_table = Table(enum_data, colWidths=[90, 200, 225])
    enum_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 4),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_accent_bg]),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(enum_table)
    story.append(Spacer(1, 12))

    # SECTION 3: MODEL EXPLANATIONS (ALL 16 MODELS)
    story.append(Paragraph("3. Detailed Table & Model Explanation (All 16 Models)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))

    models_info = [
        ("1. User (`users`)", "Stores core authentication accounts.", [
            ("id", "String (UUID, PK)", "Unique user identification identifier."),
            ("email", "String (Unique)", "Account login email address."),
            ("passwordHash", "String", "Bcrypt multi-round hashed password string."),
            ("role", "Role (Enum)", "CITIZEN (Default), OFFICER, or ADMIN access level."),
            ("Relations", "Profile, Pickups", "Has 1 Profile, N Pickups, N Rewards, N Certificates, N Complaints, 1 Driver/Officer/Admin.")
        ]),
        ("2. Profile (`profiles`)", "Citizen user profile and identity credentials.", [
            ("userId", "String (FK, Unique)", "Foreign key referencing `users.id` (On Delete Cascade)."),
            ("fullName / phone", "String", "Citizen contact full name and phone number."),
            ("citizenId", "String (Unique)", "Government Citizen Identification Code (e.g. `DL-2026-8941`)."),
            ("aadhaarLinked", "Boolean", "Flags verified Aadhaar authentication status.")
        ]),
        ("3. PickupRequest (`pickup_requests`)", "Core doorstep collection request.", [
            ("requestId", "String (Unique)", "Unique tracking code (e.g. `REQ-2026-8941`)."),
            ("status", "PickupStatus (Enum)", "Active status in pickup lifecycle (`SUBMITTED` to `COMPLETED`)."),
            ("hazardLevel", "HazardLevel (Enum)", "AI-tagged hazard rating (LOW, MODERATE, HIGH, CRITICAL)."),
            ("centerId / driverId", "String (FK)", "Assigned Recycling Center, Driver, and Vehicle IDs.")
        ]),
        ("4. EWasteItem (`ewaste_items`)", "Individual electronic scrap item payload.", [
            ("pickupRequestId", "String (FK)", "Parent pickup request ID (On Delete Cascade)."),
            ("deviceName / brand", "String", "Device model name, brand, and category."),
            ("imageUrl", "String?", "Cloudinary photo URL or Base64 scan image string.")
        ]),
        ("5. RecyclingCenter (`recycling_centers`)", "CPCB-certified recycling facility registry.", [
            ("registrationNo", "String (Unique)", "Official CPCB license registration number."),
            ("capacityTonnes", "Float", "Monthly max recycling processing load capacity."),
            ("latitude / longitude", "Float", "GPS coordinates for Leaflet GIS map rendering.")
        ]),
        ("6. Vehicle (`vehicles`)", "EV collection fleet van registry.", [
            ("vehicleNumber", "String (Unique)", "EV registration plate number."),
            ("assignedDriverId", "String (FK, Unique)", "Assigned field collection driver ID."),
            ("batteryFuelPercent", "Int", "Real-time battery percentage telemetry.")
        ]),
        ("7. Driver (`drivers`)", "Field collection driver profile.", [
            ("userId", "String (FK, Unique)", "Foreign key referencing `users.id`."),
            ("district / rating", "String / Float", "Operating district zone and performance rating.")
        ]),
        ("8. Officer (`officers`)", "CPCB regional environmental field officer.", [
            ("officerCode", "String (Unique)", "Unique officer badge code (e.g. `OFF-DEL-104`)."),
            ("dutyZone", "String", "Assigned regional environmental inspection zone.")
        ]),
        ("9. Admin (`admins`)", "Central CPCB government executive account.", [
            ("adminCode", "String (Unique)", "Executive nodal director access code."),
            ("roleTitle", "String", "Department executive designation.")
        ]),
        ("10. Certificate (`certificates`)", "Digital Green Recycling & Carbon Offset Proof.", [
            ("certificateNo", "String (Unique)", "Official certificate code (e.g. `CERT-DL-8902`)."),
            ("co2SavedKg", "Float", "Calculated CO2 offset saved (Weight kg x 1.45)."),
            ("cpbLicenseNo", "String", "Issuing facility CPCB licensing badge.")
        ]),
        ("11. Complaint (`complaints`)", "Citizen illegal e-waste dumping report.", [
            ("complaintId", "String (Unique)", "Grievance ticket ID."),
            ("assignedOfficerId", "String (FK)", "Assigned CPCB field inspection officer ID.")
        ]),
        ("12. AIClassification (`ai_classifications`)", "AI computer vision classification log.", [
            ("confidenceScore", "Float", "AI identification confidence percentage (e.g. 98.4%)."),
            ("estimatedValue", "String", "Extracted market scrap valuation range.")
        ]),
        ("13-16. Auxiliary Models", "Notifications, Rewards, Announcements, Logs.", [
            ("Reward", "Points Catalog", "Citizen green points balance and vouchers."),
            ("Notification", "Alert System", "Real-time system notification stream."),
            ("ActivityLog", "Audit Trail", "Security tracking log storing action details and IP address.")
        ])
    ]

    for title, desc, fields in models_info:
        story.append(Paragraph(f"<b>{title}</b> — <i>{desc}</i>", h2_style))
        m_table_data = [[Paragraph("Field Name", table_header), Paragraph("Data Type & Constraint", table_header), Paragraph("Description & Relational Flow", table_header)]]
        for fname, ftype, fdesc in fields:
            m_table_data.append([
                Paragraph(f"`{fname}`", table_cell_bold),
                Paragraph(ftype, table_cell),
                Paragraph(fdesc, table_cell)
            ])
        m_table = Table(m_table_data, colWidths=[120, 140, 255])
        m_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), c_dark),
            ('BOX', (0,0), (-1,-1), 1, c_border),
            ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
            ('PADDING', (0,0), (-1,-1), 3),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ]))
        story.append(m_table)
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 10))
    story.append(PageBreak())

    # SECTION 4: RAW PRISMA SCHEMA CODE
    story.append(Paragraph("4. Complete Raw Prisma Schema Code (`schema.prisma`)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.75, color=c_secondary, spaceBefore=0, spaceAfter=8))
    story.append(Paragraph("Below is the exact, complete source code of the production Prisma schema located at `prisma/schema.prisma`:", body_style))
    story.append(Spacer(1, 6))

    if os.path.exists(schema_path):
        with open(schema_path, "r", encoding="utf-8") as f:
            raw_schema = f.read()
        
        # Split raw schema into manageable chunks for rendering
        schema_lines = raw_schema.split("\n")
        chunk_size = 70
        for i in range(0, len(schema_lines), chunk_size):
            chunk_text = "\n".join(schema_lines[i:i+chunk_size])
            story.append(Preformatted(chunk_text, code_style))
            if i + chunk_size < len(schema_lines):
                story.append(Spacer(1, 8))
    else:
        story.append(Paragraph("Prisma schema file not found at path.", body_style))

    story.append(Spacer(1, 14))
    story.append(HRFlowable(width="100%", thickness=1, color=c_primary, spaceBefore=10, spaceAfter=10))
    story.append(Paragraph("<i>End of Official Database Documentation — EcoRoute Platform Specification</i>", ParagraphStyle('EndNote', parent=body_style, fontName='Helvetica-Oblique', alignment=1, textColor=colors.HexColor("#64748b"))))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated Database PDF: {filename}")

if __name__ == '__main__':
    schema_file = "/Users/ahk/Desktop/EcoRoute/prisma/schema.prisma"
    output_pdf = "/Users/ahk/Desktop/EcoRoute/EcoRoute_Database_Documentation.pdf"
    if len(sys.argv) > 1:
        output_pdf = sys.argv[1]
    build_database_pdf(output_pdf, schema_file)
