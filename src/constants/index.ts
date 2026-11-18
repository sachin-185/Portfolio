import {
  ExperienceItem, EducationItem, AchievementItem, ProjectItem, CertificateItem, RecommendationItem
} from "@/types";

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Achievements", href: "#achievements" },
  { name: "Certificates", href: "#certificates" },
  { name: "Projects", href: "#projects" },
  { name: "Recommendations", href: "#recommendations" },
  { name: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = {
  github: "https://github.com/sachin-185",
  linkedin: "https://www.linkedin.com/in/sachin-svd",
  twitter: "https://x.com/sachin26031",
  hackerrank: "https://www.hackerrank.com/profile/svsachin2005",
  email: "mailto:svsachinsd@gmail.com",
};

export const PERSONAL_INFO = {
  name: "Sachin S",
  roles: ["Software Developer", "AI Developer"],
  about: "AI & Data Science student exploring the intersection of machine learning and modern web development. Welcome to my digital workspace!",
  aboutDetailed: "I am a B.Tech student in Artificial Intelligence & Data Science at Rajalakshmi Institute of Technology, Chennai. As an aspiring software and AI engineer, I specialize in building intelligent systems, architecting resilient backend services, and training machine learning models.\n\nI have gained hands-on engineering experience through intern roles at Emertxe Information Technologies (integrating secure JWT auth, Express.js/MongoDB microservices, and on-device Transformers.js AI assistants), Plugzmart (developing XGBoost Learning-to-Rank models and Isolation Forest anomaly detectors for EV fast chargers), and Google (engaging the developer community as Student Ambassador and Hackathon Mentor). I focus on writing clean, scalable code, designing robust APIs, and deploying cutting-edge AI pipelines.",
  location: "Chennai, Tamil Nadu, India",
  experienceYear: "2023 - 2027",
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Emertxe Information Technologies",
    role: "Software Engineering Intern",
    period: "August 2026 – September 2026",
    location: "Bengaluru, Karnataka",
    points: [
      "Integrated secure JWT authentication and RESTful APIs across 5 core services using Express.js and MongoDB, eliminating state desynchronization across cart and order checkout workflows.",
      "Architected a client-facing AI assistant with an end-to-end pipeline across 3 services, leveraging React 19 and Redux Toolkit reusable UI components for conversational product discovery.",
      "Reduced cloud AI inference costs by 80% and query latency by implementing on-device Transformers.js (distilgpt2) with keyword-based intent classification and automated sentiment escalation."
    ],
    tech: ["React 19", "Express.js", "MongoDB", "Redux Toolkit", "Transformers.js", "distilgpt2", "JWT", "RESTful APIs"]
  },
  {
    company: "Plugzmart",
    role: "Software Developer (AI/ML) Intern",
    period: "Feb 2026 – May 2026",
    location: "Chennai, Tamil Nadu",
    points: [
      "Worked on building an AI-powered EV charging platform, enabling dynamic load distribution across 8 power modules and improving real-time troubleshooting capabilities.",
      "Developed an automated load-balancing engine for DC fast chargers to help increase power distribution efficiency by 32%.",
      "Scored hardware health and ranked optimal rectifiers using XGBoost models. Designed a real-time diagnostic copilot to help reduce troubleshooting latency by 40% via Qwen 2.5 LLM."
    ],
    tech: ["Python", "Flask", "React", "Vite", "XGBoost", "Scikit-Learn", "REST APIs", "Qwen 2.5"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "Rajalakshmi Institute of Technology",
    degree: "B.Tech - Artificial Intelligence & Data Science",
    period: "2023 – 2027",
    image: "/images/rit.png",
  },
  {
    institution: "SBOA Matriculation and Higher Secondary School",
    degree: "12th Grade: 89.83%",
    period: "2011 – 2023",
    image: "/images/sboa.png",
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "CODEPULSE'26",
    metric: "1st Position Winner",
    detail: "Secured 1st Position in CODEPULSE'26, an online coding contest organized by ACM VIT Chennai & RIT.",
    category: "Code",
  },
  {
    title: "Smart India Hackathon",
    metric: "Top 50 Finalist (SIH 2024)",
    detail: "Selected as a Top 50 Finalist in SIH 2024, competing against 50+ internal institutional teams.",
    category: "Hackathon",
  },
  {
    title: "Leadership & Community",
    metric: "Google Ambassador & Mentor",
    detail: "Served as a Google Student Ambassador and Hackathon Mentor, guiding developer teams through technical system architecture.",
    category: "Leadership",
  },
  {
    title: "Competitive Programming",
    metric: "575+ LeetCode (200-Day Streak)",
    detail: "Solved 575+ problems on LeetCode (12+ badges, 200-Day Streak), earned 4+ stars on HackerRank, and achieved a max rating of 1519+ on CodeChef.",
    category: "Code",
  },
  {
    title: "SkillRack",
    metric: "Solved 970+ Problems",
    detail: "Achieved Top 100 ranking on Coding Challenge leaderboard, with a record of 973+ problems solved across data structures, algorithms, and logic-based challenges.",
    category: "Code",
  },
  {
    title: "NPTEL Academic Excellence",
    metric: "Secured 84% (Elite + Silver)",
    detail: "Secured top grade in Research Methods in Health Promotion course offered by NPTEL, IIT Kharagpur.",
    category: "Academics",
  },
  {
    title: "LinkedIn Community",
    metric: "4K+ Followers",
    detail: "Authored 29+ technical and educational posts with consistent active sharing over 2+ years.",
    category: "Growth",
  }
];

export const SKILLS = {
  languages: ["Python", "Java", "C", "JavaScript"],
  frameworks: ["React.js", "Node.js", "Express.js", "Flask", "Streamlit"],
  databases: ["MongoDB", "MySQL", "ChromaDB"],
  aiMl: ["Gemini API", "RAG", "Hugging Face", "Generative AI"],
  tools: ["Firebase", "Postman", "Git/GitHub", "Docker"],
  coreCs: [
    "Data Structures & Algorithms (DSA)",
    "DBMS",
    "Operating Systems (OS)",
    "Object-Oriented Programming (OOP)",
    "Computer Networks (CN)"
  ],
  // Legacy aliases for component backwards compatibility
  technologies: ["React.js", "Node.js", "Express.js", "Flask", "Streamlit", "PyTorch", "Scikit-Learn", "RAG"],
};

export const PROJECTS: ProjectItem[] = [
  {
    title: "DriveLegal",
    description: "Architected a hybrid edge/cloud compliance engine achieving <5ms p95 query latency and offline availability via client-side NLP intent router in React/Vite that falls back to cloud RAG only for complex multi-statute queries. Engineered an Express and ChromaDB retrieval pipeline minimizing LLM hallucinations on a 500-query test suite via post-generation constraint filters.",
    tech: ["React", "Node.js", "Express.js", "ChromaDB", "Hugging Face", "Firebase"],
    image: "/images/drivelegal.svg",
    link: "https://github.com/sachin-185/DriveLegal",
    category: "AI",
  },
  {
    title: "SmartCorp AI",
    description: "Engineered a full-stack corporate analytics dashboard using React, Flask, and Firestore, exposing REST APIs for real-time telemetry ingestion. Integrated a decoupled ML inference pipeline combining DistilBERT for sentiment analysis and BART-Large-CNN for meeting summarization. Developed a predictive risk-scoring engine using Scikit-Learn to track departmental attrition and schedule variance.",
    tech: ["React", "Flask", "PyTorch", "Hugging Face", "Firebase", "Scikit-Learn"],
    image: "/images/ai.png",
    link: "https://github.com/sachin-185/AI-Powered-Corporate-Insights-Platform",
    category: "AI",
  },
  {
    title: "OptiChargeAI",
    description: "Engineered a full-stack EV fast-charger telemetry and dynamic allocation dashboard using React and Flask, exposing REST APIs to monitor real-time power dispatch across an 8-module 240kW DC rectifier matrix. Trained an XGBoost Learning-to-Rank (LTR) model combined with an Isolation Forest anomaly detector to proactively bypass degraded modules (>90°C), with a Qwen 2.5 (7B) on-premise diagnostic copilot (<150ms inference).",
    tech: ["React", "Flask", "Vite", "Qwen 2.5", "XGBoost", "Isolation Forest"],
    image: "/images/opticharge.png",
    link: "https://github.com/sachin-185/OptiChargeAI",
    category: "AI",
  },
  {
    title: "Vortex WebAgent (Gemini MCP)",
    description: "Developed an autonomous browser agent powered by Model Context Protocol (MCP) using Puppeteer for automated web extraction and multi-step workflows. Implemented intelligent reasoning based on Gemini API with optimized token budgets.",
    tech: ["Python", "Streamlit", "Gemini API", "Puppeteer", "MCP"],
    image: "/images/mcp.png",
    link: "https://github.com/sachin-185/Browser-MCP-Agent-Gemini-",
    category: "AI",
  },
  {
    title: "InternView AI — Interview Preparation Platform",
    description: "Developed a high-fidelity, responsive SPA employing Framer Motion layout transitions. Engineered a resilient generative AI integration pipeline using Qwen2.5-7B with custom regex-based sanitizers to parse LLM outputs into structured JSON.",
    tech: ["React", "Node.js", "SQLite", "Qwen2.5-7B", "Docker", "Tailwind CSS"],
    image: "/images/InterviewAi.png",
    link: "https://github.com/sachin-185/InternView-AI.git",
    category: "Web",
  },
  {
    title: "ShopGo: Autonomous Marketplace",
    description: "A next-generation self-sustaining e-commerce ecosystem with an autonomous intelligence layer powered by local NLP for user intent classification, semantic product search, and automated support.",
    tech: ["React", "Express.js", "MongoDB", "Hugging Face"],
    image: "/images/shopgo.png",
    link: "https://github.com/sachin-185/ShopGo-Autonomous-Marketplace-Engine-",
    category: "AI",
  },
  {
    title: "Healthcare Data Security",
    description: "Designed a secure healthcare web app using AES encryption with different key sizes and output formats to safeguard patient telemetry and sensitive health records.",
    tech: ["React", "CryptoJS", "AES", "JavaScript"],
    image: "/images/healthcare_security.jpg",
    link: "https://github.com/sachin-185/Healthcare-Data-Security-",
    category: "Web",
  },
  {
    title: "AI Based Internship Recommendation Engine",
    description: "Developed an AI system leveraging SentenceTransformer embeddings to match student candidate profiles with internship job descriptions through cosine similarity rankings.",
    tech: ["Python", "SentenceTransformers", "Hugging Face", "Streamlit"],
    image: "/images/Intern.png",
    link: "https://huggingface.co/spaces/hi5bro/AI_Based_Internship_Recommendation_Engine/tree/main",
    category: "AI",
  },
  {
    title: "Netflix Analytics Report",
    description: "Analyzed Netflix dataset to uncover insights on content trends, regional distributions, and viewing patterns using Power BI interactive dashboards.",
    tech: ["Power BI", "Data Analysis", "Visualization"],
    image: "/images/Netflix.png",
    link: "https://github.com/sachin-185/Netflix-Analytics-Report.git",
    category: "Data",
  },
  {
    title: "Microsoft Official Website Replica",
    description: "A pixel-perfect responsive replica of the official Microsoft website built with modern HTML, CSS, and vanilla JavaScript.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image: "/images/microsoft_replica.jpg",
    link: "https://github.com/sachin-185/Microsoft-Clone.git",
    category: "Web",
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    title: "Research Methods in Health Promotion",
    issuer: "NPTEL | IIT Kharagpur",
    image: "/certificates/nptel_research_methods.png",
    link: "/certificates/nptel_research_methods.png",
    type: "Silver Elite",
    category: "Others",
  },
  {
    title: "Entrepreneurship Essentials",
    issuer: "NPTEL | IIT Kharagpur",
    image: "/certificates/NPTEL.png",
    link: "/certificates/NPTEL.png",
    category: "Others",
  },
  {
    title: "Prompt Engineering & Programming",
    issuer: "Columbia University",
    period: "Aug 2025",
    image: "/certificates/columbia_prompt_engineering.png",
    link: "/certificates/columbia_prompt_engineering.png",
    type: "Specialization",
    category: "AI/ML",
  },
  {
    title: "AI Enterprise Workflow: End-to-End ML",
    issuer: "IBM",
    period: "2025",
    image: "/certificates/ibm_thumb.png",
    link: "/certificates/IBM certificate.pdf",
    type: "Professional",
    category: "AI/ML",
  },
  {
    title: "From SQL to MongoDB's Document Model",
    issuer: "MongoDB",
    period: "2025",
    image: "/certificates/mongodb.png",
    link: "/certificates/mongodb.png",
    type: "Skill",
    category: ["Databases", "Backend & Tools"],
  },
  {
    title: "Java",
    issuer: "Udemy",
    period: "2025",
    image: "/certificates/udemy_thumb.png",
    link: "/certificates/udemy_java_basics.pdf",
    type: "Skill",
    category: "Backend & Tools",
  },
  {
    title: "Anthropic Certification",
    issuer: "Anthropic",
    period: "2026",
    image: "/certificates/anthropic.png",
    link: "/certificates/anthropic.png",
    type: "Certification",
    category: "AI/ML",
  },
  {
    title: "Hackathon",
    issuer: "Tech Event",
    period: "2026",
    image: "/certificates/hackathon.png",
    link: "/certificates/hackathon.png",
    type: "Participation",
    category: "Others",
  },
  {
    title: "ISRO Workshop",
    issuer: "Workshop",
    period: "2026",
    image: "/certificates/workshop.png",
    link: "/certificates/workshop.png",
    type: "Certificate of Completion",
    category: "Others",
  },
  {
    title: "Coding challenge",
    issuer: "Unknown",
    period: "2026",
    image: "/certificates/new_certificate.png",
    link: "/certificates/new_certificate.png",
    type: "Certificate",
    category: "Others",
  },
];

// Re-export Recommendation interface for backwards compatibility
export type Recommendation = RecommendationItem;

export const RECOMMENDATIONS: RecommendationItem[] = [
  {
    name: "Deepak Boopathi",
    role: "Student at M.Kumarasamy College of Engineering, Karur",
    date: "September 12, 2026",
    platform: "LinkedIn",
    text: "I had the pleasure of meeting Mr. Sachin S during a Quantum Computing workshop conducted by SRM College of Technology, Kattankulathur, Chennai. I had an incredible time interacting with him throughout the workshop, and the conversations I had with him helped me learn a lot of new things. Mr. Sachin S was a knowledgeable and friendly person who had the patience to share his knowledge and experiences with me by explaining things to me in a simple and understandable manner. I really appreciated the time he took to interact with me, and it helped me to learn a lot of new things. I had a great learning experience by meeting and interacting with him, and I am thankful for the knowledge and perspective he shared with me. I would recommend Sachin for his passion for learning, willingness to help others, and interest in technology.",
  },
  {
    name: "Rishika M",
    role: "Student at Rajalakshmi Institute of Technology",
    date: "June 20, 2025",
    platform: "LinkedIn",
    text: "I had the privilege of working with Mr. Sachin S during our college hackathon, where they mentored me and guided our team with incredible clarity, patience, and leadership. From brainstorming innovative ideas to helping us refine our solution, their presence was truly motivating. Mr. Sachin S has a deep understanding of technology and problem-solving, and their ability to simplify complex concepts made a huge difference for us as juniors. Beyond the technical skills, they consistently encouraged collaboration and brought out the best in every team member. I’m grateful for the opportunity to have worked with such a passionate and knowledgeable mentor, and I have no doubt they’ll make a great impact wherever they go.",
  },
];
