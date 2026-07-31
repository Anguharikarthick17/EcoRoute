// ============================================================
// EcoRoute — Shared TypeScript Types
// ============================================================

import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

// ── Navigation ───────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  /** Optional icon name from react-icons */
  icon?: string;
  /** Nested dropdown items */
  children?: NavItem[];
}

// ── Footer ───────────────────────────────────────────────────
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  heading: string;
  links: FooterLink[];
}

// ── Buttons ──────────────────────────────────────────────────
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  /** Render as an anchor tag */
  href?: string;
  /** Open in new tab (only when href is set) */
  external?: boolean;
  children: ReactNode;
}

// ── Card ─────────────────────────────────────────────────────
export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  /** Renders an accessible button-like card */
  onClick?: () => void;
}

// ── Section Title ────────────────────────────────────────────
export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  /** Show the accent underline rule */
  showRule?: boolean;
  /** Gov badge beside title */
  badge?: string;
  className?: string;
  /** HTML id for the h2 element (for aria-labelledby) */
  id?: string;
}

// ── Container ────────────────────────────────────────────────
export interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Force full width */
  fluid?: boolean;
  as?: "div" | "section" | "article" | "main" | "aside";
}

// ── Government Badge ─────────────────────────────────────────
export type BadgeVariant = "official" | "verified" | "new" | "beta" | "gov";

export interface GovBadgeProps {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
}

// ── Loading Spinner ──────────────────────────────────────────
export type SpinnerSize = "sm" | "md" | "lg" | "xl";

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
  /** Full-page overlay */
  fullPage?: boolean;
}

// ── Empty State ──────────────────────────────────────────────
export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

// ── 404 Component ────────────────────────────────────────────
export interface NotFound404Props {
  title?: string;
  description?: string;
  className?: string;
}

// ── Social Links ─────────────────────────────────────────────
export interface SocialLink {
  label: string;
  href: string;
  icon: string; // react-icons icon name
}

// ── Language ─────────────────────────────────────────────────
export interface Language {
  code: string;
  label: string;
  nativeLabel: string;
}
