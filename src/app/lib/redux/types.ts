export interface ResumeProfile {
  name: string;
  summary: string;
  location: string;
  aboutMyself: string;
}

export interface ResumeLanguage {
  language: string;
  level: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  name: string,
  period: string,
  stack?: string[],
  mainTask?: string,
  descriptions?: string[],
  achievements?: string[]
}

export interface ResumeSkill {
  skill: string;
  experience: string | number;
}

export interface ResumeSkillAndTechnologies {
  skills: ResumeSkill[];
  technologies: string;
  tools: string;
  infra: string;
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  otherProjects: string;
  languages: ResumeLanguage[];
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skillsAndTechnologies: ResumeSkillAndTechnologies;
  custom: ResumeCustom;
}

export type ResumeKey = keyof Resume;
