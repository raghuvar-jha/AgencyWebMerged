import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

// Recipes from DESIGN.md §6.1. Don't override sizes/colours via className;
// add a variant or size here (and in DESIGN.md) instead.

export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover",
  secondary: "border border-primary bg-background text-primary hover:bg-surface-strong",
  ghost: "text-primary hover:bg-surface-strong",
  whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-small",
  md: "h-12 px-6 text-small",
  lg: "h-14 px-7 text-body",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function buttonClasses({ variant = "primary", size = "md", fullWidth }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full");
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props} />;
}
