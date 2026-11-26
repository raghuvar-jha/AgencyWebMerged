import "server-only";
import {
  siDocker,
  siExpo,
  siFirebase,
  siFlutter,
  siGoogleads,
  siGoogleanalytics,
  siGooglesearchconsole,
  siGoogletagmanager,
  siHtml5,
  siJavascript,
  siKotlin,
  siMeta,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siRazorpay,
  siReact,
  siRedis,
  siSanity,
  siSemrush,
  siShopify,
  siStrapi,
  siStripe,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTypescript,
  siVercel,
  siWoocommerce,
  siWordpress,
  type SimpleIcon,
} from "simple-icons";

// Technology logos from Simple Icons (CC0), keyed by the `slug` used in lib/content/tech.ts.
// Server-only: the path data is rendered as inline SVG and never shipped as client JS.
// Not in Simple Icons (initials badge instead): AWS, Ahrefs.
const icons: Record<string, SimpleIcon> = {
  docker: siDocker,
  expo: siExpo,
  firebase: siFirebase,
  flutter: siFlutter,
  googleads: siGoogleads,
  googleanalytics: siGoogleanalytics,
  googlesearchconsole: siGooglesearchconsole,
  googletagmanager: siGoogletagmanager,
  html5: siHtml5,
  javascript: siJavascript,
  kotlin: siKotlin,
  meta: siMeta,
  mongodb: siMongodb,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  postgresql: siPostgresql,
  prisma: siPrisma,
  razorpay: siRazorpay,
  react: siReact,
  redis: siRedis,
  sanity: siSanity,
  semrush: siSemrush,
  shopify: siShopify,
  strapi: siStrapi,
  stripe: siStripe,
  supabase: siSupabase,
  swift: siSwift,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vercel: siVercel,
  woocommerce: siWoocommerce,
  wordpress: siWordpress,
};

/** Brand colours below this contrast on white are near-invisible; render them in `foreground`. */
const MIN_LOGO_CONTRAST = 1.5;

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export type TechLogo = { path: string; color: string | null };

/** Logo path + colour for a slug. `color: null` means "use text-foreground". Undefined = no logo. */
export function getTechLogo(slug: string): TechLogo | undefined {
  const icon = icons[slug];
  if (!icon) return undefined;
  const contrast = 1.05 / (luminance(icon.hex) + 0.05);
  return { path: icon.path, color: contrast < MIN_LOGO_CONTRAST ? null : `#${icon.hex}` };
}
