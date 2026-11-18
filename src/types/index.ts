export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tech: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  image: string;
}

export interface AchievementItem {
  title: string;
  metric: string;
  detail: string;
  category: "Code" | "Hackathon" | "Leadership" | "Academics" | "Growth" | string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  category: "AI" | "Web" | "Data";
}

export interface CertificateItem {
  title: string;
  issuer: string;
  period?: string;
  image: string;
  link: string;
  type?: string;
  category: string | string[];
}

export interface RecommendationItem {
  name: string;
  role: string;
  date: string;
  platform: string;
  text: string;
  badge?: string;
  relationship?: string;
}
