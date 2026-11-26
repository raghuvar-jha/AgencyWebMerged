import { siFacebook, siInstagram, siX, siYoutube, type SimpleIcon } from "simple-icons";
import { isFilled, site, type SocialNetwork } from "@/lib/site";

// DESIGN.md §6.15. Only networks with a real https:// URL in lib/site.ts render.
// 44px hit area, 32px visual circle (so circles sit 12px apart). LinkedIn isn't in
// Simple Icons (removed at LinkedIn's request), so it shows a text "in" mark.

const networks: Record<SocialNetwork, { label: string; icon: SimpleIcon | null }> = {
  instagram: { label: "Instagram", icon: siInstagram },
  linkedin: { label: "LinkedIn", icon: null },
  facebook: { label: "Facebook", icon: siFacebook },
  youtube: { label: "YouTube", icon: siYoutube },
  x: { label: "X", icon: siX },
};

export function SocialLinks({ className }: { className?: string }) {
  const filled = (Object.keys(networks) as SocialNetwork[]).filter((key) => {
    const url = site.socials[key];
    return isFilled(url) && url.startsWith("https://");
  });
  if (filled.length === 0) return null;

  return (
    <ul className={`-ml-1.5 flex flex-wrap ${className ?? ""}`}>
      {filled.map((key) => {
        const { label, icon } = networks[key];
        return (
          <li key={key}>
            <a
              href={site.socials[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on ${label}`}
              className="group grid size-11 place-items-center rounded-pill"
            >
              <span className="grid size-8 place-items-center rounded-pill bg-primary text-primary-foreground transition duration-150 group-hover:bg-primary-hover motion-safe:group-hover:-translate-y-0.5">
                {icon ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
                    <path d={icon.path} />
                  </svg>
                ) : (
                  <span aria-hidden="true" className="text-small font-bold">
                    in
                  </span>
                )}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
