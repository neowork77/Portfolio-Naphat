"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "th";

export interface Translations {
  // Nav
  nav: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
    resume: string;
  };
  // Hero
  hero: {
    name: string;
    greeting: string;
    role: string;
    tagline: string;
    viewProjects: string;
    contactMe: string;
  };
  // About
  about: {
    subtitle: string;
    title: string;
    bio: string;
    letsTalk: string;
    location: string;
    role: string;
    passion: string;
    passionValue: string;
    profilePhoto: string;
    education1: {
      title: string;
      school: string;
      year: string;
    };
    education2: {
      title1: string;
      title2: string;
      school: string;
      year: string;
      honors: string;
    };
  };
  // Skills
  skills: {
    subtitle: string;
    title: string;
  };
  // Projects
  projects: {
    subtitle: string;
    title: string;
    viewCode: string;
    liveDemo: string;
  };
  // Experience
  experience: {
    subtitle: string;
    title: string;
    jobs: {
      role: string;
      company: string;
      period: string;
      description: string;
      logo?: string;
    }[];
  };
  // Contact
  contact: {
    subtitle: string;
    title: string;
    description: string;
    sendEmail: string;
  };
  // Footer
  footer: {
    rights: string;
  };
}

const en: Translations = {
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    resume: "Resume",
  },
  hero: {
    name: "Naphat Thamtheero",
    greeting: "Hello, I'm",
    role: "Software & AI Engineer",
    tagline: "Seeking opportunities to leverage my expertise as a Software Engineer, AI Engineer, or Data Specialist to build high-impact solutions.",
    viewProjects: "View Projects",
    contactMe: "Contact Me",
  },
  about: {
    subtitle: "Get to know me",
    title: "About Me",
    bio: "I’m a fresh graduate who loves coding and is deeply interested in AI and Data. I’m looking for my first professional role as a Software & AI Engineer, where I can apply my skills to real-world projects and build high-quality software.",
    letsTalk: "Let's Talk",
    location: "Location",
    role: "Role",
    passion: "Passion",
    passionValue: "Web Development",
    profilePhoto: "Profile Photo",
    education1: {
      title: "Science-Mathematics Program (EP)",
      school: "Suankularb Wittayalai Thonburi School",
      year: "Academic Year 2019 - 2022",
    },
    education2: {
      title1: "Artificial Intelligence Engineering",
      title2: "and Data Science",
      school: "Bangkok University",
      year: "Academic Year 2022 - 2026",
      honors: "First-Class Honors",
    },
  },
  skills: {
    subtitle: "What I work with",
    title: "Skills & Technologies",
  },
  projects: {
    subtitle: "My Work",
    title: "Featured Projects",
    viewCode: "Code",
    liveDemo: "Demo",
  },
  experience: {
    subtitle: "My Professional Journey",
    title: "Work Experience",
    jobs: [
      {
        role: "Frontend Developer Intern",
        company: "BOTNOI CONSULTING COMPANY LIMITED",
        period: "Jun 2025 - Nov 2025 (6 months)",
        description: "Assisted in developing web applications using React and Node.js. Collaborated with the team to improve UI/UX and optimize performance.",
        logo: "/images/BOTNOI_LOGO.png",
      },
    ],
  },
  contact: {
    subtitle: "Get in Touch",
    title: "Let's Work Together",
    description:
      "I’m always open to new opportunities, whether it’s an exciting project, a business collaboration, or simply exchanging ideas and experiences. If you’d like to work together or get in touch, feel free to reach out anytime.",
    sendEmail: "Send me an email",
  },
  footer: {
    rights: "All rights reserved.",
  },
};

const th: Translations = {
  nav: {
    about: "เกี่ยวกับ",
    skills: "ทักษะ",
    projects: "ผลงาน",
    experience: "ประสบการณ์",
    contact: "ติดต่อ",
    resume: "เรซูเม่",
  },
  hero: {
    name: "นภัทร ธรรมธีโร",
    greeting: "สวัสดีครับ, ผมชื่อ",
    role: "วิศวกรซอฟต์แวร์และปัญญาประดิษฐ์",
    tagline: "มีความสนใจและกำลังมองหาโอกาสในการทำงานด้าน Software Engineer, AI Engineer และ Data เพื่อสร้างสรรค์โซลูชันที่มีประสิทธิภาพ",
    viewProjects: "ดูผลงาน",
    contactMe: "ติดต่อฉัน",
  },
  about: {
    subtitle: "รู้จักฉันให้มากขึ้น",
    title: "เกี่ยวกับฉัน",
    bio: "ผมเป็นนักศึกษาจบใหม่ที่สนุกกับการเขียนโค้ดและหลงใหลในเรื่อง AI กับ Data ครับ ตอนนี้กำลังมองหาโอกาสแรกในการทำงานสาย Software & AI Engineer เพื่อที่จะได้นำความรู้ที่เรียนมาไปใช้แก้ปัญหาจริงๆ และพัฒนาซอฟต์แวร์ที่มีคุณภาพครับ",
    letsTalk: "คุยกันเลย",
    location: "ที่อยู่",
    role: "ตำแหน่ง",
    passion: "ความหลงใหล",
    passionValue: "พัฒนาเว็บไซต์",
    profilePhoto: "รูปโปรไฟล์",
    education1: {
      title: "วิทย์-คณิต (English Program)",
      school: "โรงเรียนสวนกุหลาบวิทยาลัย ธนบุรี",
      year: "ปีการศึกษา 2562 - 2565",
    },
    education2: {
      title1: "คณะวิศวกรรมปัญญาประดิษฐ์",
      title2: "และวิทยาการข้อมูล",
      school: "มหาวิทยาลัยกรุงเทพ",
      year: "ปีการศึกษา 2565 - 2569",
      honors: "เกียรตินิยมอันดับ 1",
    },
  },
  skills: {
    subtitle: "เทคโนโลยีที่ใช้",
    title: "ทักษะ & เทคโนโลยี",
  },
  projects: {
    subtitle: "ผลงานของฉัน",
    title: "โปรเจกต์เด่น",
    viewCode: "โค้ด",
    liveDemo: "เดโม",
  },
  experience: {
    subtitle: "เส้นทางการทำงานของฉัน",
    title: "ประสบการณ์ทำงาน",
    jobs: [
      {
        role: "นักศึกษาฝึกงาน (Frontend Developer)",
        company: "บริษัท บอทน้อยคอนซัลติ้ง จำกัด",
        period: "มิ.ย. 2025 - พ.ค. 2025 (6 เดือน)",
        description: "ช่วยในการพัฒนาเว็บแอปพลิเคชันโดยใช้ React และ Node.js รวมถึงร่วมงานกับทีมเพื่อปรับปรุง UI/UX และเพิ่มประสิทธิภาพการทำงานของระบบ",
        logo: "/images/BOTNOI_LOGO.png",
      },
    ],
  },
  contact: {
    subtitle: "ติดต่อฉัน",
    title: "มาทำงานร่วมกัน",
    description:
      "ยินดีต้อนรับทุกโอกาสใหม่ ๆ ไม่ว่าจะเป็นโปรเจกต์ที่น่าสนใจ ความร่วมมือทางธุรกิจ หรือการพูดคุยแลกเปลี่ยนประสบการณ์ หากสนใจร่วมงานหรือต้องการติดต่อ สามารถทักมาได้เสมอครับ!",
    sendEmail: "ส่งอีเมลทักทาย",
  },
  footer: {
    rights: "สงวนลิขสิทธิ์ทุกประการ",
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { en, th };

// ── Context ────────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  t: en,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => {
    // Add class to fade text out
    document.body.classList.add("lang-switching");
    
    setTimeout(() => {
      // Swap language while text is transparent
      setLang((prev) => (prev === "en" ? "th" : "en"));
      
      // Remove class to fade text back in
      document.body.classList.remove("lang-switching");
    }, 200); // Wait for color transition before swapping text
  };

  return (
    <LanguageContext.Provider value={{ lang, t: TRANSLATIONS[lang], toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
