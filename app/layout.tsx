import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// TODO: set metadataBase to the production URL once the domain is known.
export const metadata: Metadata = {
  title: {
    default: "Web Merged | Web Apps, Mobile Apps & SEO in Noida",
    template: "%s | Web Merged",
  },
  description:
    "Web Merged builds fast web apps, websites and mobile apps, and grows them with SEO and Google/Meta Ads, for small businesses in Noida. Get a free website audit.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans text-body text-foreground">
        {children}
      </body>
    </html>
  );
}
