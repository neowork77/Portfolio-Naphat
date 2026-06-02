export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  images?: string[];   // array of image URLs for the modal gallery
  coverImage?: string; // thumbnail shown on the card
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// ── Personal info ─────────────────────────────────────────────────────────────
export const personalInfo = {
  name: "Naphat Thamtheero",
  fullName: "Naphat Thammatheero",
  role: "Full Stack Developer",
  tagline:
    "Crafting clean, performant web experiences with modern technologies.",
  bio: "I'm a passionate Full Stack Developer with expertise in building modern web applications using React, Next.js, and Node.js. I enjoy crafting clean, maintainable code and creating seamless user experiences. Currently based in Bangkok, Thailand, I'm always excited about new challenges and opportunities to grow as a developer.",
  email: "neowork.nn@gmail.com",
  github: "https://github.com/neowork77?tab=repositories",
  linkedin: "https://www.linkedin.com/in/naphattham/",
  location: "Bangkok, Thailand",
};

// ── Skills ────────────────────────────────────────────────────────────────────
export const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", icon: "Layers" },
      { name: "Next.js", icon: "Globe" },
      { name: "Angular", icon: "Hexagon" },
      { name: "TypeScript", icon: "Code2" },
      { name: "JavaScript (ES6+)", icon: "Code" },
      { name: "HTML5", icon: "FileCode" },
      { name: "CSS3", icon: "Palette" },
      { name: "Tailwind CSS", icon: "Palette" },
      { name: "Framer Motion", icon: "Zap" },
      { name: "Responsive Design", icon: "MonitorSmartphone" },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js", icon: "Server" },
      { name: "Golang", icon: "Box" },
      { name: "Python", icon: "Terminal" },
      { name: "REST API", icon: "Network" },
      { name: "GraphQL", icon: "Share2" },
      { name: "PostgreSQL", icon: "Database" },
      { name: "MySQL", icon: "Database" },
      { name: "Firebase (Realtime DB, Auth, Storage)", icon: "Cloud" },
      { name: "Supabase (PostgreSQL, Realtime, Edge Functions)", icon: "Database" },
    ],
  },
  {
    category: "AI & Intelligent Systems",
    skills: [
      { name: "LLM (Large Language Models)", icon: "Brain" },
      { name: "Agentic AI", icon: "Bot" },
      { name: "ChatBot Development", icon: "MessageSquare" },
      { name: "Prompt Engineering", icon: "TerminalSquare" },
      { name: "LangChain / LlamaIndex", icon: "Link" },
      { name: "OpenAI API Integration", icon: "Cpu" },
      { name: "Vector Databases (Pinecone / Milvus)", icon: "Database" },
      { name: "Machine Learning Basics", icon: "LineChart" },
      { name: "Natural Language Processing (NLP)", icon: "Languages" },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub", icon: "GitBranch" },
      { name: "Docker", icon: "Box" },
      { name: "VS Code", icon: "Code2" },
      { name: "Vercel", icon: "Cloud" },
      { name: "Netlify", icon: "Cloud" },
      { name: "Postman", icon: "Send" },
      { name: "CI/CD Pipelines", icon: "Workflow" },
      { name: "Linux Command Line", icon: "Terminal" },
      { name: "npm / yarn / pnpm", icon: "Package" },
      { name: "Figma (Design to Code)", icon: "Figma" },
    ],
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "1",
    title: "SignMate - AI-Powered Sign Language Translator",
    description:
      "SignMate: แอปพลิเคชันประมวลผลภาษามือโดยใช้โครงข่ายประสาทเทียม (Deep Learning) และเทคนิคการติดตามจุดบนมือ (Hand Landmarks) เพื่อแปลความหมายและสื่อสารออกมาในรูปแบบประโยคที่เข้าใจง่าย รองรับการทำงานทั้งบน Web และ Mobile (รับหน้าที่เป็น Full Stack Developer ในโปรเจกต์นี้)",
    techStack: [
      // 🎨 Frontend & Core
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI (Radix UI)",
      "React Router",
      "React Query (TanStack Query)",
      "Zod",
      "Lucide React",

      // 📷 Media & Utilities
      "React Webcam",
      "React Easy Crop",
      "Browser Image Compression",
      "Sonner",

      // ☁️ Backend & Cloud Infrastructure
      "Firebase",
      "Firebase Cloud Functions",
      "Firebase Admin SDK",
      "Python (Backend)",

      // 🤖 Machine Learning & Computer Vision
      "TensorFlow / Keras",
      "MediaPipe",
      "OpenCV",
      "NumPy",

      // 🧪 Testing & Tooling
      "Vitest",
      "Playwright",
      "React Testing Library",
      "ESLint",
      "PostCSS"
    ],
    githubUrl: "https://github.com/neowork77/SignMate",
    demoUrl: "https://signmate-cbe60.web.app/",
    coverImage: "/images/signmate-project/signmate01.png",
    images: [
      "/images/signmate-project/signmate01.png",
      "/images/signmate-project/signmate02.png",
      "/images/signmate-project/signmate03.png",
      "/images/signmate-project/signmate04.png",
      "/images/signmate-project/signmate05.png",
      "/images/signmate-project/signmate06.png",
      "/images/signmate-project/signmate07.png",
      "/images/signmate-project/signmate08.png",
      "/images/signmate-project/signmate09.png",

    ],
  },
  {
    id: "2",
    title: "BU Dorms RAG CHAT",
    description:
      "BU Dorms RAG CHAT คือระบบจัดการและตอบคำถามอัจฉริยะสำหรับนักศึกษามหาวิทยาลัยกรุงเทพ ที่ผสานพลังของ Large Language Models (LLM) เข้ากับเทคนิค RAG (Retrieval-Augmented Generation) เพื่อให้ได้ข้อมูลที่แม่นยำ ทันสมัย และลดปัญหาการคิดไปเองของ AI",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API", "Hugging Face Inference", "Rive", "Python", "Pandas", "NumPy", "FAISS", "Jupyter Notebook"],
    githubUrl: "https://github.com/neowork77/BU-Dorms-RAG-CHAT",
    demoUrl: "https://budorms.vercel.app/",
    coverImage: "/images/bu-dorms/bu-dorms-02.png",
    images: [
      "/images/bu-dorms/bu-dorms-02.png",
      "/images/bu-dorms/bu-dorms-01.png",
      "/images/bu-dorms/bu-dorms-03.png",
      "/images/bu-dorms/bu-dorms-04.png",
      "/images/bu-dorms/bu-dorms-05.png",
      "/images/bu-dorms/bu-dorms-06.png",
    ],
  },
  // {
  //   id: "3",
  //   title: "Task Manager App",
  //   description:
  //     "Collaborative task management tool with real-time updates, drag-and-drop, and team workspace features.",
  //   techStack: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
  //   githubUrl: "https://github.com/",
  //   demoUrl: "#",
  //   coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
  //   images: [
  //     "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?w=1200&q=80",
  //   ],
  // },
  // {
  //   id: "4",
  //   title: "Weather Dashboard",
  //   description:
  //     "Clean weather application displaying real-time forecasts with interactive charts and location search.",
  //   techStack: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
  //   githubUrl: "https://github.com/",
  //   coverImage: "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?w=800&q=80",
  //   images: [
  //     "https://images.unsplash.com/photo-1454789476662-53eb23ba5907?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=1200&q=80",
  //     "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&q=80",
  //   ],
  // },
];
