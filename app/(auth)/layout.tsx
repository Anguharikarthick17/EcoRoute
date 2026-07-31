import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | EcoRoute",
    default: "Authentication | EcoRoute",
  },
  description:
    "Securely access your EcoRoute account — India's official AI-powered e-waste management platform by the Government of India.",
  robots: {
    index: false, // auth pages should not be indexed
    follow: false,
  },
};

/**
 * Auth Layout — Wraps all pages under /login, /register, etc.
 *
 * This is a nested layout inside the root app/layout.tsx, so the
 * global Header, Navbar, and Footer from the root layout continue
 * to be rendered. This layout adds no additional wrappers — it
 * simply provides shared metadata for the auth route group.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
