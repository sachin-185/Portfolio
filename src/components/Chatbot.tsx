import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, Settings, Plus, Trash2, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

interface CustomQA {
  id: string;
  prompt: string;
  answer: string;
}

const CHATBOT_KNOWLEDGE = {
  greetings: [
    "Hi there! I'm Sachin's AI Assistant. Ask me anything about his experience, projects, or achievements!",
    "Hello! I can help you learn more about Sachin's technical profile. What would you like to know?",
    "Hey! Welcome to Sachin's portfolio. I'm here to answer your questions about his work."
  ],
  about: "Sachin S is an AI Developer and Software Developer pursuing his B.Tech in Artificial Intelligence & Data Science at Rajalakshmi Institute of Technology (Graduating 2027). He is passionate about building edge/cloud AI systems, training machine learning models, and developing full-stack applications.",
  experience: "Sachin S has completed engineering internships:\n- **Emertxe Information Technologies** (Aug – Sep 2026): Software Engineering Intern. Integrated JWT auth and RESTful APIs across 5 core services using Express.js and MongoDB; built client-facing AI assistant with React 19 and Redux Toolkit; slashed cloud inference costs by 80% via on-device Transformers.js (distilgpt2).\n- **Plugzmart** (Feb – May 2026): Software Developer (AI/ML) Intern. Developed an automated load-balancing engine for DC fast chargers (+32% efficiency) using XGBoost LTR models, Isolation Forest anomaly detector, and Qwen 2.5 LLM diagnostic copilot.\n- **Google**: Google Student Ambassador & Hackathon Mentor guiding teams through technical system architecture.",
  projects: "Sachin has developed several featured projects:\n- **DriveLegal**: Hybrid edge/cloud legal compliance engine achieving <5ms p95 query latency via client-side NLP intent router in React/Vite that falls back to cloud RAG only for complex queries, with Express + ChromaDB retrieval pipeline.\n- **SmartCorp AI**: Full-stack corporate analytics dashboard (React, Flask, Firestore) with DistilBERT and BART-Large-CNN inference pipelines and Scikit-Learn risk-scoring engine.\n- **OptiChargeAI**: EV fast-charger dynamic allocation dashboard using XGBoost LTR model, Isolation Forest, and Qwen 2.5 (7B) on-premise diagnostic copilot (<150ms inference).\n- **Vortex WebAgent (Gemini MCP)**: Autonomous browser agent using Puppeteer, Streamlit, and Gemini API.\n- **InternView AI**: Interview preparation platform with React 19, SQLite, and Qwen2.5-7B.",
  achievements: "Sachin's milestones and achievements include:\n- **CODEPULSE'26**: 1st Position Winner in online coding contest organized by ACM VIT Chennai & RIT.\n- **Smart India Hackathon (SIH 2024)**: Top 50 Finalist among 50+ internal institutional teams.\n- **Leadership**: Google Student Ambassador & Hackathon Mentor guiding teams on system architecture.\n- **Competitive Programming**: 575+ LeetCode problems (12+ badges, 200-Day Streak), 4+ stars on HackerRank, 1519+ peak rating on CodeChef, and 973+ problems on SkillRack (Top 100 rank).\n- **NPTEL**: 84% (Elite + Silver) in Health Promotion course from IIT Kharagpur.",
  skills: "Sachin's core technical skills:\n- **Languages**: Python, Java, C, JavaScript\n- **Frameworks**: React.js, Node.js, Express.js, Flask, Streamlit\n- **Databases**: MongoDB, MySQL, ChromaDB\n- **AI & ML**: Gemini API, RAG, Hugging Face, Generative AI\n- **Tools & Platforms**: Firebase, Postman, Git/GitHub, Docker\n- **Core CS**: Data Structures & Algorithms (DSA), DBMS, Operating Systems (OS), OOP, Computer Networks (CN)",
  recommendations: "Sachin has received verified LinkedIn recommendations:\n- **Deepak Boopathi** (M.Kumarasamy College of Engineering): Met Sachin during a Quantum Computing workshop at SRM College of Technology, praising his patience, clarity in explaining complex topics, and eagerness to help.\n- **Rishika M** (Rajalakshmi Institute of Technology): Worked with Sachin on a college hackathon team where Sachin served as mentor and team guide, commending his problem-solving leadership and collaboration."
};

type Persona = "friendly" | "recruiter" | "interviewer" | "custom";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 385, height: 550 });
  const [persona, setPersona] = useState<Persona>("friendly");
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeCustomPrompt, setActiveCustomPrompt] = useState("");
  const [customQAs, setCustomQAs] = useState<CustomQA[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init", sender: "bot",
      text: CHATBOT_KNOWLEDGE.greetings[0]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("sachin_custom_qas");
    if (saved) {
      try {
        setCustomQAs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load custom QAs", e);
      }
    }
  }, []);

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setDimensions({
        width: Math.max(320, Math.min(800, startWidth - deltaX)),
        height: Math.max(420, Math.min(850, startHeight - deltaY))
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleAddQA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const updated = [
      ...customQAs,
      {
        id: `qa-${Date.now()}`,
        prompt: newQuestion.trim(),
        answer: newAnswer.trim()
      }
    ];
    setCustomQAs(updated);
    localStorage.setItem("sachin_custom_qas", JSON.stringify(updated));
    setMessages((prev) => [
      ...prev,
      {
        id: `sys-add-${Date.now()}`,
        sender: "bot",
        text: `Successfully added custom prompt: **"${newQuestion}"**.`
      }
    ]);

    setNewQuestion("");
    setNewAnswer("");
  };

  const handleDeleteQA = (id: string) => {
    const updated = customQAs.filter((item) => item.id !== id);
    setCustomQAs(updated);
    localStorage.setItem("sachin_custom_qas", JSON.stringify(updated));
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showSettings]);

  const presetPrompts = [
    { label: "Work Experience", query: "Tell me about his internships at Emertxe and Plugzmart" },
    { label: "Featured Projects", query: "Tell me about DriveLegal and his projects" },
    { label: "Achievements & CP", query: "What are his coding stats and achievements?" },
    { label: "Technical Skills", query: "What tech stack does he use?" }
  ];
  const postProcessResponse = (baseResponse: string, currentPersona: Persona, promptInstructions: string): string => {
    let processed = baseResponse;
    const instructions = promptInstructions.toLowerCase();
    if (currentPersona === "recruiter") {
      processed = `👔 **Recruiter Mode Activated**:\n\n${processed}\n\n*Sachin's strong problem solving capabilities and experience building XGBoost LTR engines and ML models make him an ideal candidate for AI/Software engineering roles. Feel free to download his resume!*`;
    } else if (currentPersona === "interviewer") {
      processed = `🧐 **Technical Interviewer Mode**:\n\n${processed}\n\n*Follow-up technical question for you: How would you evaluate the trade-offs of XGBoost versus deep neural networks for a resource-constrained environment like an EV charger?*`;
    }

    if (currentPersona === "custom" && instructions.trim()) {
      if (instructions.includes("emoji")) {
        processed = `🤖✨ ${processed.replace(/\n/g, " 🚀\n")} 💻🔥`;
      } else if (instructions.includes("french") || instructions.includes("translate to french")) {
        processed = `🇫🇷 (Prompt: Translate to French)\n\nVoici le profil de Sachin: B.Tech en intelligence artificielle et science des données à Rajalakshmi Institute of Technology. Il a fait un stage chez Plugzmart où il a développé des modèles XGBoost pour le contrôle de charge électrique.`;
      } else if (instructions.includes("short") || instructions.includes("brief") || instructions.includes("one sentence")) {
        const sentences = processed.split(/[.!?]/);
        processed = sentences[0] ? `${sentences[0]}. ⚡` : processed;
      } else if (instructions.includes("caps") || instructions.includes("uppercase")) {
        processed = processed.toUpperCase();
      } else if (instructions.includes("poem") || instructions.includes("rhyme")) {
        processed = `📝 *Poetic AI Mode*:\n\nSachin S, a coder bold,\nIn AI paths, his stories unfold.\nAt Plugzmart, XGBoost he did guide,\nWith code and metrics side by side. ✨`;
      } else {
        processed = `${processed}\n\n*(Custom Prompt Applied: "${promptInstructions}")*`;
      }
    }

    return processed;
  };

  const getResponseText = (query: string): string => {
    const q = query.toLowerCase().trim();
    const matchedQA = customQAs.find((item) => {
      const trigger = item.prompt.toLowerCase().trim();
      return q.includes(trigger) || trigger.includes(q);
    });

    if (matchedQA) {
      return matchedQA.answer;
    }
    if (q.includes("experience") || q.includes("work") || q.includes("intern") || q.includes("emertxe") || q.includes("plugzmart") || q.includes("google") || q.includes("ambassador") || q.includes("quantum") || q.includes("edunet") || q.includes("prodigy") || q.includes("security")) {
      return CHATBOT_KNOWLEDGE.experience;
    }
    if (q.includes("achievement") || q.includes("codepulse") || q.includes("sih") || q.includes("hackathon") || q.includes("leetcode") || q.includes("skillrack") || q.includes("award") || q.includes("stats") || q.includes("academic") || q.includes("codechef") || q.includes("hackerrank")) {
      return CHATBOT_KNOWLEDGE.achievements;
    }
    if (q.includes("project") || q.includes("drivelegal") || q.includes("smartcorp") || q.includes("mcp") || q.includes("internview") || q.includes("opticharge") || q.includes("shopgo")) {
      return CHATBOT_KNOWLEDGE.projects;
    }
    if (q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("framework") || q.includes("database") || q.includes("core cs")) {
      return CHATBOT_KNOWLEDGE.skills;
    }
    if (q.includes("about") || q.includes("who is") || q.includes("sachin") || q.includes("profile")) {
      return CHATBOT_KNOWLEDGE.about;
    }
    if (q.includes("recommendation") || q.includes("endorsement") || q.includes("review") || q.includes("feedback") || q.includes("deepak") || q.includes("rishika") || q.includes("mentor")) {
      return CHATBOT_KNOWLEDGE.recommendations;
    }
    if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greet")) {
      return CHATBOT_KNOWLEDGE.greetings[Math.floor(Math.random() * CHATBOT_KNOWLEDGE.greetings.length)];
    }
    return "I can answer questions about Sachin's **experience** at Emertxe and Plugzmart, his **projects** (like DriveLegal, SmartCorp AI, OptiChargeAI), his **achievements** (CODEPULSE'26 1st Prize, SIH 2024 Finalist, LeetCode 575+), **skills**, or **recommendations** from peers. What would you like to know?";
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const baseResponse = getResponseText(text);
      const finalResponse = postProcessResponse(baseResponse, persona, activeCustomPrompt);
      
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: "bot", text: finalResponse }
      ]);
    }, 700);
  };

  const applyCustomInstructions = () => {
    setActiveCustomPrompt(customPrompt);
    setShowSettings(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: "bot",
        text: `Configured chatbot instructions: **"${customPrompt || "Friendly (Default)"}"**. Ask me anything, and I will apply these instructions!`
      }
    ]);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[999] font-poppins">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            style={isMobile ? undefined : { width: dimensions.width, height: dimensions.height }}
            className={cn(
              "bg-[#0a0a0a]/95 border border-white/10 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl select-none z-50",
              isMobile 
                ? "fixed inset-x-3 bottom-20 top-20 rounded-2xl max-h-[82vh]"
                : "absolute bottom-16 right-0 rounded-3xl"
            )}
          >
            
            {!isMobile && (
              <div 
                onMouseDown={handleResizeMouseDown}
                className="absolute top-0 left-0 w-8 h-8 cursor-nwse-resize z-50 flex items-center justify-center group/resize"
                title="Drag to resize chatbot"
              >
                <svg className="w-2.5 h-2.5 text-neutral-600 group-hover/resize:text-[#c6ff00] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="4" y1="20" x2="20" y2="4" />
                  <line x1="10" y1="20" x2="20" y2="10" />
                  <line x1="16" y1="20" x2="20" y2="16" />
                </svg>
              </div>
            )}

            
            <div className={cn("p-4 sm:p-5 border-b border-white/5 bg-gradient-to-r from-neutral-950 to-neutral-900 flex justify-between items-center select-none", !isMobile ? "pl-8" : "pl-4")}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#c6ff00]/10 border border-[#c6ff00]/25 flex items-center justify-center text-[#c6ff00] shrink-0">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-none">Sachin AI Assistant</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-pulse" />
                    <span className="text-[10px] text-neutral-400 font-mono">Custom Q&A & Size</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    showSettings 
                      ? "bg-[#c6ff00]/10 border-[#c6ff00]/30 text-[#c6ff00]" 
                      : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                  }`}
                  title="Configure AI prompts & answers"
                >
                  <Settings size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            
            <div className="flex-1 relative overflow-hidden flex flex-col">
              
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 200 }}
                    className="absolute inset-0 bg-[#0a0a0a] z-40 p-6 flex flex-col gap-6 overflow-y-auto"
                  >
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Sparkles size={16} className="text-[#c6ff00]" />
                        Chatbot Q&A Settings
                      </h4>
                      <button 
                        onClick={() => setShowSettings(false)}
                        className="text-xs text-neutral-400 hover:text-white font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md cursor-pointer"
                      >
                        Back
                      </button>
                    </div>

                    
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                        AI Persona / Tone
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["friendly", "recruiter", "interviewer"] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => {
                              setPersona(mode);
                              if (mode === "friendly") setCustomPrompt("");
                              else if (mode === "recruiter") setCustomPrompt("Be a helpful recruiter");
                              else if (mode === "interviewer") setCustomPrompt("Ask follow-up interview questions");
                            }}
                            className={`py-2 rounded-xl text-xs uppercase font-mono tracking-wider transition-all border cursor-pointer ${
                              persona === mode 
                                ? "bg-[#c6ff00]/15 border-[#c6ff00]/40 text-[#c6ff00] font-bold"
                                : "bg-[#050505] border-white/5 text-neutral-400 hover:text-white hover:border-white/10"
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold flex justify-between items-center">
                        <span>Custom Formatting Instruction</span>
                        <span className="text-[9px] text-[#c6ff00] lowercase font-normal">e.g. "french", "short", "emoji"</span>
                      </label>
                      <textarea
                        value={customPrompt}
                        onChange={(e) => {
                          setCustomPrompt(e.target.value);
                          setPersona("custom");
                        }}
                        rows={2}
                        placeholder="e.g. 'Make replies short', 'Write in emojis', 'Translate to French'..."
                        className="p-3.5 rounded-xl bg-[#050505] border border-white/10 text-white placeholder-neutral-600 text-xs focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] outline-none transition-all resize-none font-light"
                      />
                      <button
                        onClick={applyCustomInstructions}
                        className="w-full py-2.5 bg-[#c6ff00]/10 border border-[#c6ff00]/25 text-[#c6ff00] hover:bg-[#c6ff00] hover:text-black font-semibold text-xs uppercase tracking-wider font-mono rounded-xl transition-all cursor-pointer"
                      >
                        Apply Tone
                      </button>
                    </div>

                    
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-1.5">
                        <HelpCircle size={14} className="text-[#c6ff00]" />
                        Custom Prompts & Answers Manager
                      </label>

                      
                      <form onSubmit={handleAddQA} className="flex flex-col gap-2 bg-[#050505] p-4 rounded-2xl border border-white/5">
                        <input
                          type="text"
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          placeholder="If user asks: (e.g. 'favorite hobby')"
                          className="p-3 bg-[#0a0a0a] border border-white/5 rounded-xl text-xs text-white placeholder-neutral-700 focus:border-[#c6ff00] outline-none transition-all"
                        />
                        <textarea
                          value={newAnswer}
                          onChange={(e) => setNewAnswer(e.target.value)}
                          placeholder="AI response answer..."
                          rows={2}
                          className="p-3 bg-[#0a0a0a] border border-white/5 rounded-xl text-xs text-white placeholder-neutral-700 focus:border-[#c6ff00] outline-none transition-all resize-none"
                        />
                        <button
                          type="submit"
                          className="mt-1 py-2 bg-[#c6ff00] text-black font-bold text-xs uppercase tracking-wider font-mono rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#c6ff00]/95 cursor-pointer"
                        >
                          <Plus size={14} /> Add Custom Q&A
                        </button>
                      </form>

                      
                      {customQAs.length > 0 && (
                        <div className="flex flex-col gap-2.5 mt-2">
                          <h5 className="text-[10px] font-mono uppercase text-neutral-500 font-bold">Active Custom Q&As ({customQAs.length})</h5>
                          <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                            {customQAs.map((item) => (
                              <div key={item.id} className="p-3 rounded-xl bg-[#050505] border border-white/5 flex justify-between items-start gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-[#c6ff00] font-mono truncate">Q: "{item.prompt}"</p>
                                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">A: {item.answer}</p>
                                </div>
                                <button
                                  onClick={() => handleDeleteQA(item.id)}
                                  className="p-1.5 text-neutral-600 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                                  title="Delete custom Q&A"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 select-text">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border text-xs select-none ${
                      msg.sender === "user" 
                        ? "bg-white/5 border-white/10 text-neutral-300"
                        : "bg-[#c6ff00]/10 border-[#c6ff00]/25 text-[#c6ff00]"
                    }`}>
                      {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div className={`p-4 rounded-2xl text-sm leading-relaxed border font-light ${
                      msg.sender === "user"
                        ? "bg-[#050505] border-white/10 text-neutral-200 rounded-tr-none"
                        : "bg-[#0a0a0a] border-white/5 text-neutral-300 rounded-tl-none"
                    }`}>
                      {msg.text.split("\n").map((line, idx) => (
                        <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                          {line.split("**").map((subText, subIdx) => 
                            subIdx % 2 === 1 ? <strong key={subIdx} className="text-[#c6ff00] font-semibold">{subText}</strong> : subText
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                    <div className="w-8 h-8 rounded-lg bg-[#c6ff00]/10 border border-[#c6ff00]/25 text-[#c6ff00] flex items-center justify-center text-xs">
                      <Bot size={14} />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-[#0a0a0a] border border-white/5 text-neutral-300 flex items-center gap-1.5 h-[48px]">
                      <span className="w-1.5 h-1.5 bg-[#c6ff00] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#c6ff00] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-[#c6ff00] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            
            <div className="px-4 py-2.5 border-t border-white/5 bg-neutral-950/40 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0 select-none touch-pan-x">
              {presetPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => handleSendMessage(prompt.query)}
                  className="px-3 py-1 bg-[#0a0a0a] border border-white/5 hover:border-[#c6ff00]/30 hover:text-[#c6ff00] text-neutral-400 rounded-full text-xs font-mono tracking-wide transition-all duration-300 cursor-pointer shrink-0"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 sm:p-4 border-t border-white/5 bg-neutral-950 flex gap-2 shrink-0 select-none"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#050505] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-600 focus:border-[#c6ff00] focus:ring-1 focus:ring-[#c6ff00] outline-none transition-all duration-300"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 sm:p-3 bg-[#c6ff00] hover:bg-[#c6ff00]/90 text-black rounded-xl transition-colors disabled:opacity-50 disabled:hover:bg-[#c6ff00] flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#c6ff00] hover:bg-[#c6ff00]/90 text-black flex items-center justify-center shadow-xl shadow-[#c6ff00]/10 hover:shadow-[#c6ff00]/25 transition-all duration-300 hover:scale-105 cursor-pointer border border-[#c6ff00]/20 select-none"
        aria-label="Toggle assistant"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  );
}

