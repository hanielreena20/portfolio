export interface Metric {
  label: string;
  value: string;
  subtext?: string;
  highlight?: boolean;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  technologies: string[];
  shortDescription: string;
  problemStatement: string;
  technicalApproach: string[];
  results: Metric[];
  dataset?: string;
  pipelineSteps?: string[];
  keyHighlights: string[];
  interactiveType: 'multimodal-anomaly' | 'kidney-3d' | 'medical-nlp' | 'network-ids' | 'face-vision';
}

export interface Publication {
  title: string;
  status: string;
  year: string;
  coreProblem: string;
  methodology: string[];
  keyInnovation: string;
  metrics: Metric[];
  pipeline: {
    step: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  responsibilities: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: string[];
}

export interface EducationInfo {
  institution: string;
  degree: string;
  location: string;
  expectedGraduation: string;
  cgpa: string;
  maxCgpa: string;
  coursework: string[];
}

export interface ResearchInterest {
  title: string;
  description: string;
  iconName: string;
  keywords: string[];
}
