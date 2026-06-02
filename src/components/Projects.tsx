"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import ProjectCard from "@/components/ui/ProjectCard";
import { useLang } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLang();

  return (
    <section id="projects" className="py-20 lg:py-32">
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
            {t.projects.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            {t.projects.title}
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
