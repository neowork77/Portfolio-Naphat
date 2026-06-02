import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { personalInfo } from "@/data/portfolio";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: `${personalInfo.fullName} | ${personalInfo.role}`,
  description: personalInfo.bio,
  openGraph: {
    title: `${personalInfo.fullName} | ${personalInfo.role}`,
    description: personalInfo.bio,
    url: "/",
    siteName: personalInfo.fullName,
    images: [
      {
        url: "/images/Naphat_Profile01.jpg",
        width: 1200,
        height: 630,
        alt: `${personalInfo.fullName} Portfolio`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.fullName} | ${personalInfo.role}`,
    description: personalInfo.bio,
    images: ["/images/Naphat_Profile01.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on initial load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                const d = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
