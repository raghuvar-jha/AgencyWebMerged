import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

// Recipes from DESIGN.md §6.1. Don't override sizes/colours via className;
// add a variant, size or option here (and in DESIGN.md) instead.

export type ButtonVariant = "primary" | "secondary" | "ghost" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "default" | "pill";
export type ButtonTrailingIcon = "arrow-circle";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover",
  secondary: "border border-primary bg-background text-primary hover:bg-surface-strong",
  ghost: "text-primary hover:bg-surface-strong",
  whatsapp: "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-hover",
};

const sizes: Record<ButtonSize, { box: string; padding: string }> = {
  sm: { box: "h-11 text-small", padding: "px-4" },
  md: { box: "h-12 text-small", padding: "px-6" },
  lg: { box: "h-14 text-body", padding: "px-7" },
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  /** Adds a circled icon at the end; the button gets tight right padding (pill CTA, DESIGN.md §6.1). */
  trailingIcon?: ButtonTrailingIcon;
  fullWidth?: boolean;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  shape = "default",
  trailingIcon,
  fullWidth,
}: StyleProps = {}) {
  return cn(
    base,
    variants[variant],
    sizes[size].box,
    trailingIcon ? "gap-3 pr-2 pl-7" : sizes[size].padding,
    shape === "pill" ? "rounded-pill" : "rounded-sm",
    fullWidth && "w-full",
  );
}

function withTrailingIcon(children: ReactNode, trailingIcon?: ButtonTrailingIcon) {
  if (trailingIcon !== "arrow-circle") return children;
  return (
    <>
      {children}
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-pill border-2 border-current/80"
      >
        <ArrowRight className="size-4" strokeWidth={2.25} />
      </span>
    </>
  );
}

export function Button({
  variant,
  size,
  shape,
  trailingIcon,
  fullWidth,
  className,
  children,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, shape, trailingIcon, fullWidth }), className)}
      {...props}
    >
      {withTrailingIcon(children, trailingIcon)}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  shape,
  trailingIcon,
  fullWidth,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link className={cn(buttonClasses({ variant, size, shape, trailingIcon, fullWidth }), className)} {...props}>
      {withTrailingIcon(children, trailingIcon)}
    </Link>
  );
}
