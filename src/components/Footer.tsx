"use client";

import { personalInfo } from "@/data/portfolio";
import TechMarquee from "@/components/ui/TechMarquee";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-8 flex flex-col gap-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8  pt-6">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
        </p>
        <p className="text-xs text-zinc-300 dark:text-zinc-700">
          Thank you for visiting! Designed and developed by Naphat.
        </p>
      </div>
      <TechMarquee />
    </footer>
  );
}
