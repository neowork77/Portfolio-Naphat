"use client";

import { motion } from "framer-motion";
import { Mail, Github, Phone } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { useLang } from "@/context/LanguageContext";
import Image from "next/image";

const GmailIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <Image
    src="https://thesvg.org/icons/gmail-2026/default.svg"
    alt="Gmail (2026)"
    width={size}
    height={size}
    className={className}
  />
);

const LineIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <Image
    src="https://thesvg.org/icons/line/default.svg"
    alt="LINE"
    width={size}
    height={size}
    className={className}
  />
);

const LinkedinIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <Image
    src="https://thesvg.org/icons/linkedin/default.svg"
    alt="LinkedIn"
    width={size}
    height={size}
    className={className}
  />
);

const LINKS = [
  {
    Icon: GmailIcon,
    iconColor: "",
    label: "Email",
    display: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    external: false,
  },
  {
    Icon: Phone,
    iconColor: "text-[#10B981]",
    label: "Phone",
    display: "095-760-7771",
    href: "tel:+66957607771",
    external: false,
  },
  {
    Icon: LineIcon,
    iconColor: "",
    label: "LINE",
    display: "ID : 0957607771",
    href: "https://line.me/ti/p/0957607771",
    external: true,
  },
  {
    Icon: Github,
    iconColor: "text-zinc-900 dark:text-white",
    label: "GitHub",
    display: "neowork77",
    href: personalInfo.github,
    external: true,
  },
  {
    Icon: LinkedinIcon,
    iconColor: "text-[#0A66C2]",
    label: "LinkedIn",
    display: "Naphat Thammatheeroe",
    href: personalInfo.linkedin,
    external: true,
  },
];

export default function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contact"
      className="py-20 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
              {t.contact.subtitle}
            </p>
            <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
              {t.contact.title}
            </h2>
            <p className="mb-12 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              {t.contact.description}
            </p>
          </motion.div>

          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          >
            {LINKS.map(({ Icon, iconColor, label, display, href, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.15 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40 p-5 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
              >
                <div className="rounded-xl bg-zinc-100 dark:bg-zinc-700/50 p-3">
                  <Icon size={22} className={iconColor} />
                </div>
                <div className="text-center w-full">
                  <p className="mb-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                    {label}
                  </p>
                  <p className="flex items-center justify-center gap-1 text-[13px] font-medium text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors break-all">
                    <span>{display}</span>
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white px-8 py-3.5 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 transition-colors"
          >
            <Mail size={17} />
            {t.contact.sendEmail}
          </motion.a>
        </div>
      </div>
    </section>
  );
}
