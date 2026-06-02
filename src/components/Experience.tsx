"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Briefcase } from "lucide-react";
import SkillBadge from "@/components/ui/SkillBadge";

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="py-20 lg:py-32 bg-zinc-50 dark:bg-zinc-900/30">
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
            {t.experience.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            {t.experience.title}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-6">
            {t.experience.jobs.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="mb-10 ml-6 sm:ml-8 md:ml-10 relative"
              >
                {/* Timeline dot / Logo */}
                <span className="absolute flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-white rounded-full -left-11 sm:-left-14 md:-left-16 ring-4 ring-zinc-50 dark:ring-zinc-900/30 border border-zinc-200 dark:border-zinc-700 overflow-hidden -mt-1.5 sm:-mt-2.5">
                  {job.logo ? (
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain p-1" loading="lazy" decoding="async" />
                  ) : (
                    <Briefcase size={20} className="text-zinc-500 dark:text-zinc-400 sm:w-5 sm:h-5 w-4 h-4" />
                  )}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1 sm:mb-2 gap-1 sm:gap-4">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {job.role}
                  </h3>
                  <time className="text-sm font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                    {job.period}
                  </time>
                </div>

                <h4 className="text-md font-medium text-blue-600 dark:text-blue-400 mb-3">
                  {job.company}
                </h4>

                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {job.description}
                </p>

                <SkillBadge />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
