"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useLang } from "@/context/LanguageContext";
import Image from "next/image";


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SOCIALS = [
  { Icon: Github, href: personalInfo.github, label: "GitHub" },
  { Icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { Icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
] as const;

export default function Hero() {
  const { t } = useLang();
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-16 bg-gray-100 dark:bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-16 xl:gap-20">
          {/* ── Text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="w-full max-w-2xl text-center lg:text-left"
          >
            <motion.p
              variants={item}
              className="mb-4 text-xs font-semibold tracking-widest text-zinc-500 dark:text-zinc-400 uppercase"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={item}
              className="mb-3 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white"
            >
              {t.hero.name}
            </motion.h1>

            <motion.h2
              variants={item}
              className="mb-5 text-xl sm:text-2xl font-medium text-zinc-600 dark:text-zinc-400"
            >
              {t.hero.role}
            </motion.h2>

            <motion.p
              variants={item}
              className="mb-8 max-w-md mx-auto lg:mx-0 text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              {t.hero.tagline}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="mb-8 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollTo("#projects")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                {t.hero.viewProjects}
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#contact")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-zinc-900 dark:hover:border-zinc-400 dark:hover:text-white transition-colors"
              >
                {t.hero.contactMe}
              </motion.button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex gap-3 justify-center lg:justify-start"
            >
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 hover:border-zinc-500 dark:hover:text-white dark:hover:border-zinc-500 transition-colors"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Profile visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Decorative ring */}
              <div className="absolute -inset-4 lg:-inset-5 rounded-3xl border-2 border-zinc-200 dark:border-zinc-700/50 -z-10" />
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900 flex items-center justify-center overflow-hidden shadow-inner border border-zinc-200 dark:border-none relative">
                <Image
                  src="/images/Naphat_Profile04.jpg"
                  alt="Profile"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-zinc-400 dark:text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
