import { MessageCircle } from "lucide-react";

// TODO: swap for the official WhatsApp glyph (inline SVG from WhatsApp's brand resources).
export function WhatsAppIcon({ className }: { className?: string }) {
  return <MessageCircle className={className} strokeWidth={2} aria-hidden="true" />;
}
