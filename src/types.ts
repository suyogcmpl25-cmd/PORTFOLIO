export interface ProjectData {
  id: string;
  number: string;
  title: string;
  problem: string;
  built: string;
  value: string;
  tags: string[];
  imageUrl: string;
}

export interface SolutionData {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolData {
  name: string;
  svg: string;
}

export interface AuditFormData {
  name: string;
  email: string;
  automation: string;
  website: string;
}
