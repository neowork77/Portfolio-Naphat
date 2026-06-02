"use client";

import {
  Triangle,
  FileCode,
  Palette,
  Wind,
  Rocket,
  Sparkles,
  Brain,
  Atom,
  FileCode2,
  Layers,
  Box,
  Zap,
  Code,
} from "lucide-react";

const techStack = [
  { name: "React", Icon: Atom, color: "text-[#61DAFB]" },
  { name: "Next.js", Icon: Triangle, color: "text-zinc-900 dark:text-white" },
  { name: "TypeScript", Icon: FileCode2, color: "text-[#3178C6]" },
  { name: "Antigravity", Icon: Rocket, color: "text-purple-500" },
  { name: "HTML", Icon: FileCode, color: "text-[#E34F26]" },
  { name: "CSS", Icon: Palette, color: "text-[#1572B6]" },
  { name: "Tailwind CSS", Icon: Wind, color: "text-[#38B2AC]" },
  { name: "PostCSS", Icon: Layers, color: "text-[#DD3A0A]" },
  { name: "Three.js", Icon: Box, color: "text-zinc-900 dark:text-white" },
  { name: "Framer Motion", Icon: Zap, color: "text-[#E902B5]" },
  { name: "VS Code", Icon: Code, color: "text-[#007ACC]" },
  { name: "Gemini", Icon: Sparkles, color: "text-blue-500" },
  { name: "Claude", Icon: Brain, color: "text-[#D97757]" },
];

export default function TechMarquee() {
  // Duplicate array 3 times to ensure a seamless infinite scroll loop
  const extendedStack = [...techStack, ...techStack, ...techStack];

  return (
    <div className="relative w-full overflow-hidden pb-4 bg-transparent flex flex-col items-center">
      {/* Edge Gradients for masking */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />

      {/* Marquee Container */}
      <div className="flex w-full group overflow-hidden">
        {/* ขอบจางด้านซ้าย (Left Fade) */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-60 z-10 pointer-events-none bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />

        {/* ขอบจางด้านขวา (Right Fade) */}
        <div className="absolute inset-y-0 right-0 w-20 sm:w-60 z-10 pointer-events-none bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />
        {/* We use CSS keyframes for a flawless infinite scroll that pauses on hover */}
        <div className="flex flex-nowrap w-max space-x-3 sm:space-x-4 px-4 animate-marquee hover:animation-paused">
          {extendedStack.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className="flex flex-row items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 transition-colors"
            >
              <tech.Icon className={`w-3.5 h-3.5 ${tech.color}`} />
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inject custom CSS for marquee and pause */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-left {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333333%, 0, 0); }
        }
        .animate-marquee {
          animation: scroll-left 25s linear infinite;
          will-change: transform;
        }
        .animation-paused {
          animation-play-state: paused;
        }
        @media (max-width: 640px) {
          .animate-marquee {
            animation-duration: 20s;
          }
        }
      `}} />
    </div>
  );
}
