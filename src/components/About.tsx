"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.15, ease: "easeOut" },
  },
};

export default function About() {
  const { t } = useLang();

  // The HIGHLIGHTS array has been replaced by the Premium Modern Card

  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            {t.about.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            {t.about.title}
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Profile Picture */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="lg:col-span-5 lg:self-center"
          >
            <div className="relative group aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full max-w-[260px] sm:max-w-[320px] lg:max-w-none mx-auto overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-all duration-500 hover:shadow-lg">
              <Image src="/images/Naphat_Profile01.jpg" alt="Naphat Thammatheero" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105 z-10" priority />
            </div>
          </motion.div>

          {/* Right Column: Bio + Premium Education Card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            className="lg:col-span-7 flex flex-col gap-10"
          >
            {/* Bio */}
            <div>
              <p className="mb-6 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                {t.about.bio}
              </p>

            </div>

            <div className="grid grid-cols-1 auto-rows-[1fr] gap-4 w-full">
              {/* --- การ์ดใบที่ 1 --- */}
              <div className="group relative h-full flex flex-col justify-center overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50">
                {/* Shimmer Effect */}
                <div className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] z-0" />

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
                  {/* Logo Section */}
                  <div className="shrink-0 relative">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden p-3">
                      <Image src="/images/suankularb_logo.png" alt="Suankularb Wittayalai Thonburi School Logo" fill sizes="(max-width: 768px) 96px, 112px" className="object-contain p-3" />
                    </div>
                    {/* Decorative stars */}
                    <Sparkles size={18} className="absolute -top-2 -right-2 text-yellow-500 animate-[pulse_2s_ease-in-out_infinite]" />
                    <Sparkles size={14} className="absolute -bottom-1 -left-1 text-amber-500 animate-[pulse_3s_ease-in-out_infinite]" />
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {t.about.education1.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-4">
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        {t.about.education1.school}
                      </p>
                      <p className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                        {t.about.education1.year}
                      </p>
                    </div>

                    {/* Grade & Honors Badge */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full">
                      <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-colors group-hover:border-blue-200 dark:group-hover:border-blue-900">
                        GPA 3.50
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- การ์ดใบที่ 2 --- */}
              <div className="group relative h-full flex flex-col justify-center overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50">
                {/* Shimmer Effect */}
                <div className="pointer-events-none absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/60 dark:via-white/10 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] z-0" />

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10">
                  {/* Logo Section */}
                  <div className="shrink-0 relative">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden p-3">
                      <Image src="/images/BU_LOGO.svg" alt="Bangkok University Logo" fill sizes="(max-width: 768px) 96px, 112px" className="object-contain p-3" />
                    </div>
                    {/* Decorative stars */}
                    <Sparkles size={18} className="absolute -top-2 -right-2 text-yellow-500 animate-[pulse_2s_ease-in-out_infinite]" />
                    <Sparkles size={14} className="absolute -bottom-1 -left-1 text-amber-500 animate-[pulse_3s_ease-in-out_infinite]" />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {t.about.education2.title1} <br className="hidden sm:block" /> {t.about.education2.title2}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 mb-4">
                      <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        {t.about.education2.school}
                      </p>
                      <p className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
                        {t.about.education2.year}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full">
                      <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm transition-colors group-hover:border-blue-200 dark:group-hover:border-blue-900">
                        GPA 3.56
                      </div>

                      <div className="honors-badge relative overflow-hidden inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-200 to-amber-500 dark:from-yellow-600 dark:via-yellow-300 dark:to-amber-600 text-amber-950 shadow-sm transition-transform duration-300 hover:scale-105">
                        <Sparkles size={14} className="text-amber-900 drop-shadow-sm" />
                        <span className="font-bold text-sm tracking-wide drop-shadow-sm">
                          {t.about.education2.honors}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
