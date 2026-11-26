"use server";

import { headers } from "next/headers";
import { auditSchema, type AuditState } from "@/lib/validation/audit";

// Footer audit request. Never trust client data: validate, honeypot, rate limit.
//
// TODO(storage): there is no leads table yet (schema change needs approval, see CLAUDE.md).
// Until then the request is only logged on the server with a masked email. Once a Lead
// model exists: await db.lead.create({ data: { email, source: "footer_audit" } }).

const GENERIC_ERROR = "Something went wrong. Please try again, or message us on WhatsApp.";
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// In-memory, per server instance: resets on deploy/restart and isn't shared across instances.
// Good enough to slow down casual abuse; move to the DB (or a KV store) with the leads table.
const attempts = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  attempts.set(ip, recent);
  if (attempts.size > 5000) {
    // Drop stale entries so the map can't grow without bound.
    for (const [key, times] of attempts) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) attempts.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  return `${user.slice(0, 1)}***@${domain}`;
}

export async function submitAudit(_prev: AuditState, formData: FormData): Promise<AuditState> {
  try {
    // Honeypot: real users never see or fill the "website" field.
    const honeypot = formData.get("website");
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      return { status: "error", ok: false, error: GENERIC_ERROR };
    }

    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
    if (rateLimited(ip)) {
      return { status: "error", ok: false, error: "Too many attempts. Please wait a few minutes and try again." };
    }

    const parsed = auditSchema.safeParse({ email: formData.get("email") ?? "" });
    if (!parsed.success) {
      return { status: "error", ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
    }

    console.info(`[audit] footer audit request from ${maskEmail(parsed.data.email)}`);
    return { status: "success", ok: true };
  } catch (error) {
    console.error("[audit] failed", error);
    return { status: "error", ok: false, error: GENERIC_ERROR };
  }
}
