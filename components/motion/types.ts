import type { HTMLAttributes, ReactNode } from "react";

// Shared prop types for the motion primitives. Each primitive renders its own element (`as`),
// so wrapping never adds an extra box (important for sticky headers, grids and flex rows).

export type MotionTag =
  | "div"
  | "section"
  | "header"
  | "footer"
  | "nav"
  | "ul"
  | "ol"
  | "li"
  | "p"
  | "span"
  | "article";

export type MotionTrigger = "scroll" | "load";

export type MotionElementProps = Omit<HTMLAttributes<HTMLElement>, "className" | "children"> & {
  as?: MotionTag;
  className?: string;
  children?: ReactNode;
};
