export interface EngineeringNotes {
  problem: string;
  keyDecision: string;
  challenge: string;
  hindsight: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  tags: string[];
  technologies: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  engineeringNotes: EngineeringNotes;
  skillsUsed: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  projects: string[];
  description: string;
}