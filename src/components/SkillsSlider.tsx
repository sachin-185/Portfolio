import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Layout, Terminal, Database, Code2, Cpu } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    id: "languages",
    name: "Languages",
    icon: Code2,
    description: "Core programming languages for software engineering, algorithms, and full-stack development",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ]
  },
  {
    id: "frameworks",
    name: "Frameworks",
    icon: Layout,
    description: "Modern frontend and backend frameworks for reactive interfaces and scalable microservices",
    skills: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", invert: true },
      { name: "Streamlit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    ]
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database,
    description: "Document stores, relational engines, and high-dimensional vector embeddings indexes",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "ChromaDB", icon: "custom-chromadb" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Amazon S3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    ]
  },
  {
    id: "ai-ml",
    name: "AI & ML Tools",
    icon: Brain,
    description: "Generative AI, Retrieval-Augmented Generation (RAG), LLMs, and Machine Learning pipelines",
    skills: [
      { name: "Gemini API", icon: "custom-gemini" },
      { name: "RAG", icon: "custom-rag" },
      { name: "Hugging Face", icon: "custom-huggingface" },
      { name: "Generative AI", icon: "custom-generativeai" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Scikit-Learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "XGBoost", icon: "custom-xgboost" },
      { name: "Isolation Forest", icon: "custom-isolationforest" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    ]
  },
  {
    id: "tools",
    name: "Tools & Platforms",
    icon: Terminal,
    description: "Cloud backends, containerization, API development environments, and version control",
    skills: [
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
      { name: "MCP", icon: "custom-mcp" },
    ]
  },
  {
    id: "core-cs",
    name: "Core CS",
    icon: Cpu,
    description: "Fundamental Computer Science principles, algorithmic complexity, and systems foundations",
    skills: [
      { name: "DSA", icon: "custom-dsa" },
      { name: "DBMS", icon: "custom-dbms" },
      { name: "Operating Systems", icon: "custom-os" },
      { name: "OOP", icon: "custom-oop" },
      { name: "Computer Networks", icon: "custom-cn" },
    ]
  }
];

export default function SkillsSlider() {
  const [activeTab, setActiveTab] = useState("languages");

  const currentCategory = SKILL_CATEGORIES.find((cat) => cat.id === activeTab) || SKILL_CATEGORIES[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const renderCustomIcon = (iconName: string) => {
    if (iconName === "custom-gemini") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 12.5 8.5 15.5 11.5C18.5 14.5 25 15 25 15C25 15 18.5 15.5 15.5 18.5C12.5 21.5 12 28 12 28C12 28 11.5 21.5 8.5 18.5C5.5 15.5 -1 15 -1 15C-1 15 5.5 14.5 8.5 11.5C11.5 8.5 12 2 12 2Z"
            fill="url(#geminiGrad)"
          />
          <defs>
            <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4285F4" />
              <stop offset="50%" stopColor="#9B51E0" />
              <stop offset="100%" stopColor="#E91E63" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
    if (iconName === "custom-rag") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.5">
          <path d="M4 14h6v6H4zm10-8h6v6h-6z" />
          <path d="M12 6H8a2 2 0 0 0-2 2v6m10 4v2a2 2 0 0 1-2 2h-4" />
          <circle cx="12" cy="12" r="1.5" fill="#c6ff00" />
          <path d="m15 15-3-3 3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (iconName === "custom-huggingface") {
      return (
        <span className="text-3xl select-none leading-none" role="img" aria-label="Hugging Face">🤗</span>
      );
    }
    if (iconName === "custom-generativeai") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
          <circle cx="12" cy="12" r="4" fill="#c6ff00" fillOpacity="0.2" stroke="#c6ff00" />
        </svg>
      );
    }
    if (iconName === "custom-chromadb") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="8" r="4" fill="#ff4d4d" fillOpacity="0.8" />
          <circle cx="17" cy="8" r="4" fill="#4dabf7" fillOpacity="0.8" />
          <circle cx="12" cy="16" r="4" fill="#c6ff00" fillOpacity="0.8" />
          <path d="M7 8l10 0M7 8l5 8M17 8l-5 8" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2,2" />
        </svg>
      );
    }
    if (iconName === "custom-xgboost") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4" r="1.5" fill="#c6ff00" />
          <circle cx="7" cy="11" r="1.5" />
          <circle cx="17" cy="11" r="1.5" />
          <line x1="12" y1="5.5" x2="7.75" y2="9.5" />
          <line x1="12" y1="5.5" x2="16.25" y2="9.5" />
          <circle cx="4" cy="18" r="1.5" />
          <circle cx="10" cy="18" r="1.5" />
          <line x1="7" y1="12.5" x2="4.75" y2="16.5" />
          <line x1="7" y1="12.5" x2="9.25" y2="16.5" />
        </svg>
      );
    }
    if (iconName === "custom-isolationforest") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 18l3-5 3 5H4z" fill="#333" stroke="#555" />
          <path d="M14 18l3-5 3 5h-6z" fill="#333" stroke="#555" />
          <path d="M9 15l3-6 3 6H9z" fill="#c6ff00" stroke="#c6ff00" className="animate-pulse" />
        </svg>
      );
    }
    if (iconName === "custom-mcp") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v6m0 6v6M3 12h6m6 0h6" />
        </svg>
      );
    }
    if (iconName === "custom-dsa") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="6" cy="14" r="2.5" />
          <circle cx="18" cy="14" r="2.5" />
          <circle cx="6" cy="20" r="1.5" fill="#c6ff00" />
          <path d="M10.5 7L7.5 12M13.5 7L16.5 12M6 16.5v2" />
        </svg>
      );
    }
    if (iconName === "custom-dbms") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );
    }
    if (iconName === "custom-os") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        </svg>
      );
    }
    if (iconName === "custom-oop") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="8" r="4" />
          <rect x="5" y="15" width="6" height="6" rx="1" />
          <rect x="13" y="15" width="6" height="6" rx="1" />
          <path d="M12 12v3M8 15v-1.5a1.5 1.5 0 0 1 1.5-1.5h5a1.5 1.5 0 0 1 1.5 1.5V15" />
        </svg>
      );
    }
    if (iconName === "custom-cn") {
      return (
        <svg className="w-8 h-8 object-contain" viewBox="0 0 24 24" fill="none" stroke="#c6ff00" strokeWidth="1.8" strokeLinecap="round">
          <rect x="2" y="2" width="6" height="5" rx="1" />
          <rect x="16" y="2" width="6" height="5" rx="1" />
          <rect x="9" y="17" width="6" height="5" rx="1" />
          <path d="M5 7v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7M12 13v4" />
        </svg>
      );
    }
    return null;
  };

  return (
    <section className="py-16 sm:py-24 md:py-28 bg-[#050505] overflow-hidden relative border-b border-white/5">
      
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#c6ff00]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c6ff00]">Expertise</p>
          <h2
            className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white mt-2"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Technical Skillset<span className="text-[#c6ff00]">.</span>
          </h2>
          <div className="h-1 w-16 bg-[#c6ff00] rounded-full mt-4" />
        </div>

        
        <div className="flex overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap justify-start sm:justify-center gap-2.5 sm:gap-3 md:gap-4 mb-6 sm:mb-8 scrollbar-none touch-pan-x w-full">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border font-mono select-none cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#c6ff00] text-black border-[#c6ff00] shadow-[0_0_20px_rgba(198,255,0,0.25)]"
                    : "bg-[#0c0c0c] text-neutral-400 border-white/5 hover:border-neutral-700 hover:text-white"
                }`}
              >
                <Icon size={15} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        
        <div className="text-center mb-8 sm:mb-12 px-2">
          <p className="text-xs sm:text-sm text-neutral-400 italic max-w-xl mx-auto font-mono">
            {currentCategory.description}
          </p>
        </div>

        
        <div className="min-h-[260px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            >
              {currentCategory.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03, duration: 0.25 }}
                  onMouseMove={handleMouseMove}
                  className="group relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-[#0a0a0a]/60 border border-white/5 backdrop-blur-sm shadow-sm hover:border-[#c6ff00]/30 transition-all duration-300 select-none overflow-hidden h-28 sm:h-32"
                >
                  <div className="bento-card-glow" />

                  <div className={`relative z-10 mb-2 sm:mb-3 transition-all duration-300 flex items-center justify-center ${skill.invert ? "invert brightness-200" : "grayscale group-hover:grayscale-0 group-hover:scale-110"}`}>
                    {skill.icon.startsWith("custom-") ? (
                      renderCustomIcon(skill.icon)
                    ) : (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<span class="text-[#c6ff00] font-bold text-xs">🚀</span>');
                        }}
                      />
                    )}
                  </div>

                  <span className="relative z-10 text-xs sm:text-sm font-semibold text-neutral-400 group-hover:text-white transition-colors duration-300 text-center leading-tight font-mono px-1 truncate max-w-full">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
