"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
}

/* ─── Modal Component ──────────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = project.images ?? [];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragStartX = useRef<number>(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal panel — slides up on mobile, scales in on desktop */}
      <motion.div
        initial={{ opacity: 0, y: "100%", scale: 1 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: "100%", scale: 1 }}
        /* override for sm+ */
        variants={{
          hidden: { opacity: 0, scale: 0.94, y: 24 },
          visible: { opacity: 1, scale: 1, y: 0 },
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="
          relative z-10 w-full
          /* mobile: takes up to 92vh, rounded only on top, no side margin */
          max-h-[92vh] rounded-t-2xl
          /* sm+: standard centered card */
          sm:max-w-3xl sm:max-h-[90vh] sm:rounded-2xl sm:mx-4
          border border-zinc-700 bg-zinc-900 shadow-2xl
          overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent
        "
      >
        {/* Close button — larger tap target on mobile */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-all backdrop-blur-sm"
        >
          <X size={18} />
        </button>

        {/* Image Carousel */}
        {images.length > 0 ? (
          <div className="relative w-full aspect-video overflow-hidden bg-zinc-800 rounded-t-2xl select-none">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
                onPointerDown={(e) => { dragStartX.current = e.clientX; }}
                onPointerUp={(e) => {
                  const delta = e.clientX - dragStartX.current;
                  if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
                }}
              >
                <Image
                  src={images[current]}
                  alt={`${project.title} screenshot ${current + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent pointer-events-none" />

            {/* Prev / Next buttons — larger on mobile for easier touch */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 active:scale-95 transition-all backdrop-blur-sm z-10"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 active:scale-95 transition-all backdrop-blur-sm z-10"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    aria-label={`Image ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-5 bg-white"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image counter badge */}
            <div className="absolute top-3 left-3 z-10 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-0.5 text-xs text-white/80">
              {current + 1} / {images.length}
            </div>
          </div>
        ) : (
          <div className="w-full aspect-video rounded-t-2xl bg-zinc-800 flex items-center justify-center">
            <ImageIcon size={48} className="text-zinc-600" />
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Title + links — stacks on very small screens */}
          <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 mb-3">
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug pr-8 xs:pr-0">
              {project.title}
            </h2>
            <div className="flex gap-2 shrink-0">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-500 hover:text-white active:scale-95 transition-all"
                >
                  <Github size={13} />
                  GitHub
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Demo`}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 px-3 py-1.5 text-xs text-white transition-all"
                >
                  <ExternalLink size={13} />
                  Demo
                </a>
              )}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-zinc-400 mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pb-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-zinc-800 border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Card Component ───────────────────────────────────────────────────────── */
export default function ProjectCard({ project }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.article
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        aria-label={`View ${project.title} details`}
        className="group flex h-full cursor-pointer flex-col rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/40 overflow-hidden hover:border-indigo-400/60 dark:hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
      >
        {/* Cover Image */}
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          {project.coverImage ? (
            <>
              <Image
                src={project.coverImage}
                alt={`${project.title} cover`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* "Click to view" hint — hidden on touch-primary devices */}
              <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="rounded-full bg-black/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-white">
                  View details
                </span>
              </div>
              {/* Always-visible tap hint on mobile */}
              <div className="absolute bottom-2 right-2 sm:hidden flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white/80 pointer-events-none">
                <ExternalLink size={10} />
                Tap to view
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-zinc-300 dark:text-zinc-600 select-none">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          {/* Title row */}
          <div className="mb-2 sm:mb-3 flex items-start justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white leading-snug">
              {project.title}
            </h3>
            {/* Link icons — stop propagation so they don't open modal */}
            <div className="flex gap-1 shrink-0">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} GitHub`}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 sm:p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  <Github size={15} />
                </motion.a>
              )}
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} Demo`}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 sm:p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                >
                  <ExternalLink size={15} />
                </motion.a>
              )}
            </div>
          </div>

          <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>

          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-zinc-100 dark:bg-zinc-700 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-zinc-600 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ProjectModal project={project} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
