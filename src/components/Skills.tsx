"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { useLang } from "@/context/LanguageContext";
import Image from "next/image";

type SkillImage = { src: string };

const IMAGE_MAP: Record<string, SkillImage> = {
  "React":         { src: "https://thesvg.org/icons/react/default.svg" },
  "Next.js":       { src: "https://thesvg.org/icons/nextdotjs/default.svg" },
  "Angular":       { src: "https://thesvg.org/icons/angular/default.svg" },
  "TypeScript":    { src: "https://thesvg.org/icons/typescript/default.svg" },
  "Tailwind CSS":  { src: "https://thesvg.org/icons/tailwind-css/default.svg" },
  "Framer Motion": { src: "https://thesvg.org/icons/framer/default.svg" },
  "Node.js":       { src: "https://thesvg.org/icons/nodedotjs/default.svg" },
  "Golang":        { src: "https://cdn.simpleicons.org/go" },
  "Python":        { src: "https://thesvg.org/icons/python/default.svg" },
  "REST API":      { src: "https://cdn.simpleicons.org/openapiinitiative" },
  "PostgreSQL":    { src: "https://thesvg.org/icons/postgresql/default.svg" },
  "Git / GitHub":  { src: "https://thesvg.org/icons/github/default.svg" },
  "Docker":        { src: "https://thesvg.org/icons/docker/default.svg" },
  "VS Code":       { src: "https://thesvg.org/icons/visual-studio-code/default.svg" },
  "Vercel":        { src: "https://thesvg.org/icons/vercel/mono.svg" },
  "JavaScript (ES6+)": { src: "https://thesvg.org/icons/javascript/default.svg" },
  "HTML5":         { src: "https://thesvg.org/icons/html5/default.svg" },
  "CSS3":          { src: "https://thesvg.org/icons/css3/default.svg" },
  "Responsive Design": { src: "https://cdn.simpleicons.org/bootstrap" },
  "GraphQL":       { src: "https://thesvg.org/icons/graphql/default.svg" },
  "MySQL":         { src: "https://thesvg.org/icons/mysql/default.svg" },
  "Firebase (Realtime DB, Auth, Storage)": { src: "https://thesvg.org/icons/firebase/default.svg" },
  "Supabase (PostgreSQL, Realtime, Edge Functions)": { src: "https://thesvg.org/icons/supabase/default.svg" },
  "LLM (Large Language Models)": { src: "https://thesvg.org/icons/openai/default.svg" },
  "Agentic AI":    { src: "https://cdn.simpleicons.org/anthropic" },
  "ChatBot Development": { src: "https://cdn.simpleicons.org/dialogflow" },
  "Prompt Engineering": { src: "https://cdn.simpleicons.org/googlegemini" },
  "LangChain / LlamaIndex": { src: "https://thesvg.org/icons/langchain/default.svg" },
  "OpenAI API Integration": { src: "https://thesvg.org/icons/openai/default.svg" },
  "Vector Databases (Pinecone / Milvus)": { src: "https://cdn.simpleicons.org/milvus" },
  "Machine Learning Basics": { src: "https://cdn.simpleicons.org/scikitlearn" },
  "Natural Language Processing (NLP)": { src: "https://cdn.simpleicons.org/huggingface" },
  "Netlify":       { src: "https://thesvg.org/icons/netlify/default.svg" },
  "Postman":       { src: "https://thesvg.org/icons/postman/default.svg" },
  "CI/CD Pipelines": { src: "https://cdn.simpleicons.org/githubactions" },
  "Linux Command Line": { src: "https://thesvg.org/icons/linux/default.svg" },
  "npm / yarn / pnpm": { src: "https://thesvg.org/icons/npm/default.svg" },
  "Figma (Design to Code)": { src: "https://thesvg.org/icons/figma/default.svg" },
};

export default function Skills() {
  const { t } = useLang();

  return (
    <section
      id="skills"
      className="py-20 lg:py-32 bg-zinc-50 dark:bg-zinc-900/40"
    >
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
            {t.skills.subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            {t.skills.title}
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 grid-cols-1 sm:grid-cols-2">
          {skills.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40 p-6"
            >
              <h3 className="mb-5 text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
                {cat.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map(({ name }, i) => {
                  const img = IMAGE_MAP[name];
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-700/40 border border-transparent hover:border-zinc-300 dark:hover:border-zinc-500 rounded-full transition-all duration-300 cursor-default hover:bg-white dark:hover:bg-zinc-700"
                    >
                      {img && (
                        <div className="flex items-center justify-center w-[14px] h-[14px]">
                          <Image 
                            src={img.src} 
                            alt={name} 
                            width={14} 
                            height={14} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                        {name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
