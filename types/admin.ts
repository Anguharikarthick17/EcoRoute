// ============================================================
// EcoRoute — Government Administration Module Shared Types
// ============================================================

import type { ReactNode } from "react";

export type AdminRole = "Super Admin" | "CPCB Nodal Officer" | "District Collector" | "Field Officer";

export type PriorityLevel = "Normal" | "High" | "Urgent" | "Critical";

// ── Admin User / Officer ──────────────────────────────────────
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  department: string;
  district: string;
  avatarUrl?: string;
}

// ── Citizen Directory Item ────────────────────────────────────
export interface AdminCitizenItem {
  citizenId: string;
  name: string;
  phone: string;
  email: string;
  district: string;
  registeredDate: string;
  totalPickups: number;
  status: "Active" | "Suspended" | "Pending Verification";
}

// ── Admin Pickup Management Item ──────────────────────────────
export interface AdminPickupItem {
  requestId: string;
  citizenName: string;
  citizenPhone: string;
  deviceSummary: string;
  address: string;
  district: string;
  requestDate: string;
  pickupDate: string;
  assignedDriver?: string;
  assignedVehicle?: string;
  assignedRecycler?: string;
  priority: PriorityLevel;
  status: "Submitted" | "Approved" | "Assigned" | "Collected" | "Recycled" | "Completed" | "Cancelled";
  weightKg?: number;
}

// ── Recycler Management Item ──────────────────────────────────
export interface AdminRecyclerItem {
  id: string;
  companyName: string;
  licenseNo: string;
  address: string;
  district: string;
  contactPerson: string;
  phone: string;
  email: string;
  capacityTonnes: number;
  monthlyLoadTonnes: number;
  status: "Approved" | "Pending Approval" | "Suspended";
  verified: boolean;
}

// ── Collection Center Item ────────────────────────────────────
export interface AdminCollectionCenterItem {
  id: string;
  centerName: string;
  district: string;
  address: string;
  workingHours: string;
  contactPerson: string;
  phone: string;
  capacityTonnes: number;
  todayLoadKg: number;
  activeDrivers: number;
  status: "Operational" | "Maintenance" | "Full Capacity";
}

// ── Vehicle Fleet Item ────────────────────────────────────────
export interface AdminVehicleItem {
  id: string;
  vehicleNumber: string;
  type: "EV Van" | "Heavy Hauler" | "Compact Loader";
  assignedDriver: string;
  district: string;
  currentRoute: string;
  status: "On Duty" | "Idle" | "Under Maintenance" | "In Transit";
  batteryFuelPercent: number;
  lastMaintenance: string;
}

// ── Driver Item ───────────────────────────────────────────────
export interface AdminDriverItem {
  id: string;
  driverName: string;
  assignedVehicle: string;
  phone: string;
  district: string;
  assignedPickupsCount: number;
  completedToday: number;
  availability: "Available" | "On Route" | "Off Duty";
  rating: number;
}

// ── Complaint Ticket Item ─────────────────────────────────────
export interface AdminComplaintItem {
  complaintId: string;
  citizenName: string;
  category: "Pickup Delay" | "Certificate Error" | "Agent Behavior" | "App Issue" | "Illegal Dumping";
  priority: PriorityLevel;
  assignedOfficer: string;
  dateFiled: string;
  status: "Open" | "In Progress" | "Resolved" | "Escalated";
  description: string;
}

// ── Report Metadata Item ──────────────────────────────────────
export interface AdminReportItem {
  id: string;
  title: string;
  category: "Daily Summary" | "Monthly Audit" | "Environmental Impact" | "Compliance";
  period: string;
  generatedDate: string;
  fileSize: string;
  downloadUrl?: string;
}
