import { z } from "zod";

// Footer "Free website audit" form. Used by the server action (always validated there).

export const auditSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Enter your email address.")
    .max(254, "That email address is too long.")
    .pipe(z.email("Enter a valid email address, like name@business.com.")),
});

export type AuditState =
  | { status: "idle" }
  | { status: "success"; ok: true }
  | { status: "error"; ok: false; error: string };

export const auditInitialState: AuditState = { status: "idle" };
