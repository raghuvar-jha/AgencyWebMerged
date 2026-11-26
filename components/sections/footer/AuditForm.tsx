"use client";

import { Loader2 } from "lucide-react";
import { useActionState, useId } from "react";
import { submitAudit } from "@/app/actions/audit";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { auditInitialState } from "@/lib/validation/audit";

// Footer audit form (DESIGN.md §6.15). Only the form state is client-side; validation,
// honeypot and rate limiting happen in the server action. noValidate so our own,
// specific error message is shown instead of the browser's bubble.

type Copy = { label: string; placeholder: string; button: string; pending: string; success: string };

export function AuditForm({ copy }: { copy: Copy }) {
  const [state, formAction, pending] = useActionState(submitAudit, auditInitialState);
  const id = useId();
  const inputId = `${id}-email`;
  const errorId = `${id}-error`;
  const hasError = state.status === "error";

  return (
    <div aria-live="polite" className="w-full xl:w-auto">
      {state.status === "success" ? (
        <p className="text-small font-semibold text-primary xl:max-w-xs">{copy.success}</p>
      ) : (
        <form action={formAction} noValidate className="w-full">
          <div className="flex flex-col gap-3 md:flex-row md:gap-0">
            <label htmlFor={inputId} className="sr-only">
              {copy.label}
            </label>
            <input
              id={inputId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder={copy.placeholder}
              aria-invalid={hasError || undefined}
              aria-describedby={hasError ? errorId : undefined}
              className={cn(
                "block h-12 w-full min-w-0 rounded-sm border bg-background px-5 text-body text-foreground placeholder:text-subtle focus:border-primary focus:shadow-focus focus:outline-none md:flex-1 md:rounded-r-none xl:w-72 xl:flex-none",
                hasError ? "border-error" : "border-border-strong",
              )}
            />
            {/* Honeypot: hidden from people and assistive tech; bots fill it and get rejected. */}
            <div aria-hidden="true" className="sr-only">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button
              type="submit"
              disabled={pending}
              aria-busy={pending || undefined}
              className={cn(
                buttonClasses({ size: "md" }),
                // min-w keeps the width steady when the label swaps to the spinner (DESIGN.md §6 loading).
                "min-w-44 font-bold tracking-wide uppercase md:rounded-l-none",
              )}
            >
              {pending ? (
                <>
                  <Loader2 aria-hidden="true" className="size-5 animate-spin" />
                  {copy.pending}
                </>
              ) : (
                copy.button
              )}
            </button>
          </div>
          {hasError && (
            <p id={errorId} className="mt-2 text-small text-error">
              {state.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
