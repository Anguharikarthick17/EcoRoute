import { z } from "zod";

// ── Authentication Schemas ───────────────────────────────────
export const RegisterSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pin: z.string().optional(),
  pinCode: z.string().optional(),
  role: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const RecyclerRegisterSchema = z.object({
  shopName: z.string().min(2, "Shop name is required"),
  ownerName: z.string().min(2, "Owner name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar number must be exactly 12 digits"),
  aadhaarVerified: z.boolean().optional(),
  shopAddress: z.string().min(5, "Shop address is required"),
  city: z.string().min(2, "City is required"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be 6 digits"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  businessType: z.enum(["Recycler", "Scrap Dealer", "Collection Centre"]),
  acceptedEWaste: z.array(z.string()).min(1, "Select at least one accepted e-waste item"),
  shopPhoto: z.string().optional(),
  shopLicense: z.string().optional(),
  ownerIdProof: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email or mobile number is required"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["citizen", "recycler"]).optional(),
  rememberMe: z.boolean().optional(),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// ── Pickup Request Schema ────────────────────────────────────
export const CreatePickupSchema = z.object({
  deviceName: z.string().min(2, "Device name is required"),
  category: z.string().min(2, "Category is required"),
  brand: z.string().optional(),
  pickupDate: z.string().min(1, "Pickup date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  pinCode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits"),
  instructions: z.string().optional(),
  contactMethod: z.string().optional(),
  estimatedWeight: z.number().optional(),
});

// ── E-Waste Upload Schema ─────────────────────────────────────
export const UploadEWasteSchema = z.object({
  deviceName: z.string().min(2, "Device name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  estimatedAge: z.string().optional(),
  description: z.string().optional(),
  imageBuffer: z.string().optional(), // base64 or file URL
});

// ── Complaint Schema ─────────────────────────────────────────
export const ComplaintSchema = z.object({
  category: z.string().min(2, "Category is required"),
  subject: z.string().min(3, "Subject is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["Normal", "High", "Urgent", "Critical"]).optional(),
});

// ── Announcement Schema ──────────────────────────────────────
export const AnnouncementSchema = z.object({
  title: z.string().min(3, "Title is required"),
  category: z.string().min(2, "Category is required"),
  target: z.string().optional(),
  description: z.string().min(5, "Description is required"),
  dateText: z.string().optional(),
});
