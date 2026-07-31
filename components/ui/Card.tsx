"use client";

import type { CardProps } from "@/types";
import { cn } from "@/lib/utils";

const paddingClasses = {
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
} as const;

/**
 * Card — Government-standard white card with subtle border and shadow.
 *
 * Optional `hover` prop adds a smooth lift animation.
 * Passing `onClick` renders the card as an accessible button-like element.
 *
 * @example
 * <Card>Content</Card>
 * <Card hover padding="lg">Interactive content</Card>
 */
export function Card({
  children,
  className,
  hover = false,
  padding = "md",
  onClick,
}: CardProps) {
  const classes = cn(
    "gov-card",
    hover && "gov-card--hoverable",
    paddingClasses[padding],
    onClick && [
      "cursor-pointer",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "focus-visible:outline-[var(--color-secondary)]",
    ],
    className,
  );

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={classes}
      >
        {children}
      </div>
    );
  }

  return <div className={classes}>{children}</div>;
}
