// ============================================================
// EcoRoute — Citizen Module Shared Types
// ============================================================

import type { ReactNode } from "react";

export type PickupStatus =
  | "Submitted"
  | "Approved"
  | "Assigned"
  | "Collected"
  | "Delivered"
  | "Recycled"
  | "Completed"
  | "Cancelled";

export type HazardLevel = "Low" | "Moderate" | "High" | "Critical";

export type NotificationType =
  | "pickup"
  | "notice"
  | "reward"
  | "reminder"
  | "system";

// ── Pickup Request Item ───────────────────────────────────────
export interface PickupRequest {
  id: string;
  deviceName: string;
  category: string;
  brand?: string;
  requestDate: string;
  pickupDate: string;
  timeSlot: string;
  status: PickupStatus;
  centerName: string;
  centerAddress: string;
  collectorName?: string;
  collectorPhone?: string;
  vehicleNumber?: string;
  address: string;
  city: string;
  pinCode: string;
  certificateId?: string;
  rewardPoints?: number;
  hazardLevel?: HazardLevel;
  estimatedWeight?: string;
}

// ── Recycling Center Item ──────────────────────────────────────
export interface RecyclingCenter {
  id: string;
  name: string;
  registrationNo: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  email: string;
  workingHours: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  acceptedCategories: string[];
  isOpenNow: boolean;
  latitude: number;
  longitude: number;
}

// ── Reward / Green Point Item ──────────────────────────────────
export interface RewardBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  pointsRequired: number;
  progressPercent: number;
}

export interface Milestone {
  id: string;
  title: string;
  target: string;
  current: string;
  completed: boolean;
  points: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  city: string;
  points: number;
  pickupsDone: number;
  isCurrentUser?: boolean;
}

// ── Certificate Item ──────────────────────────────────────────
export interface Certificate {
  id: string;
  certificateNo: string;
  issueDate: string;
  recycledDevice: string;
  category: string;
  weightKg: number;
  co2SavedKg: number;
  recyclerName: string;
  cpbLicenseNo: string;
  downloadUrl?: string;
  qrCodePlaceholder?: string;
}

// ── Notification Item ─────────────────────────────────────────
export interface CitizenNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

// ── AI Result Item ────────────────────────────────────────────
export interface AIIdentificationResult {
  deviceName: string;
  brand: string;
  category: string;
  confidenceScore: number; // e.g. 96.8%
  estimatedRecyclingValue: string; // e.g. "₹450 - ₹650"
  hazardLevel: HazardLevel;
  hazardDescription: string;
  recyclableComponents: string[];
  disposalRecommendation: string;
  suggestedCenter: RecyclingCenter;
}

// ── Component Props ───────────────────────────────────────────
export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export interface StatusBadgeProps {
  status: PickupStatus | HazardLevel | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface TimelineStep {
  title: string;
  description?: string;
  date?: string;
  status: "completed" | "current" | "upcoming" | "error";
}

export interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export interface CitizenSectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
  className?: string;
}
