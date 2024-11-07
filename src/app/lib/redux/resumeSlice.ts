import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "lib/redux/store";
import type {
  Resume,
  ResumeEducation, ResumeLanguage,
  ResumeProfile,
  ResumeProject,
  ResumeSkill, ResumeSkillAndTechnologies,
  ResumeWorkExperience,
} from "lib/redux/types";
import type { ShowForm } from "lib/redux/settingsSlice";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  location: "",
  aboutMyself: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: [],
};

export const initialProject: ResumeProject = {
  name: '',
  period: '',
};

export const initialLanguage: ResumeLanguage = {
  language: '',
  level: '',
};

export const initialSkills: ResumeSkill[] = Array(6).fill({ skill: "", experience: 4 });
export const initialSkillsAndTechnologies: ResumeSkillAndTechnologies = {
  skills: initialSkills,
  technologies: "",
  tools: "",
  infra: "",
};

export const initialCustom = {
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  otherProjects: "",
  skillsAndTechnologies: initialSkillsAndTechnologies,
  languages: [initialLanguage],
  custom: initialCustom,
};

// Keep the field & value type in sync with CreateHandleChangeArgsWithDescriptions (components\ResumeForm\types.ts)
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
  | { field: "descriptions"; value: string[] }
);

export type CreateChangeAction<T> = {
  idx: number;
  field: keyof T;
  value: string;
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof ResumeProfile; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    changeWorkExperiences: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperience>
      >
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.workExperiences[idx];
      workExperience[field] = value as any;
    },
    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeEducation>>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      education[field] = value as any;
    },
    changeProjects: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeProject>>
    ) => {
      const { idx, field, value } = action.payload;
      const project = draft.projects[idx];
      project[field] = value as any;
    },
    changeOtherProjects: (
      draft,
      action: PayloadAction<{ value: string }>
    ) => {
      const { value } = action.payload;
      draft.otherProjects = value;
    },
    changeSkills: (
      draft,
      action: PayloadAction<CreateChangeAction<ResumeSkill>>
    ) => {
      const { idx, field, value } = action.payload;
      const skill = draft.skillsAndTechnologies.skills[idx];
      skill[field] = value;
    },
    removeSkill: (
      draft,
      action: PayloadAction<{ idx: number }>
    ) => {
      const { idx } = action.payload;
      draft.skillsAndTechnologies.skills = draft.skillsAndTechnologies.skills.filter((_, i) => i !== idx)
    },
    addSkill: (draft) => {
      draft.skillsAndTechnologies.skills.push(initialSkills[0])
    },
    changeTechnologies: (
      draft,
      action: PayloadAction<{ field: Exclude<keyof ResumeSkillAndTechnologies, 'skills'>; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.skillsAndTechnologies[field] = value;
    },
    changeLanguages: (
      draft,
      action: PayloadAction<CreateChangeAction<ResumeLanguage>>
    ) => {
      const { idx, field, value } = action.payload;
      const language = draft.languages[idx];
      language[field] = value;
    },
    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      const { value } = action.payload;
      draft.custom.descriptions = value;
    },
    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkExperience));
          return draft;
        }
        case "educations": {
          draft.educations.push(structuredClone(initialEducation));
          return draft;
        }
        case "projects": {
          draft.projects.push(structuredClone(initialProject));
          return draft;
        }
        case "languages": {
          draft.languages.push(structuredClone(initialLanguage));
          return draft;
        }
      }
    },
    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        idx: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, idx, direction } = action.payload;
      if (form !== "skillsAndTechnologies" && form !== "custom") {
        if (
          (idx === 0 && direction === "up") ||
          (idx === draft[form].length - 1 && direction === "down")
        ) {
          return draft;
        }

        const section = draft[form][idx];
        if (direction === "up") {
          draft[form][idx] = draft[form][idx - 1];
          draft[form][idx - 1] = section;
        } else {
          draft[form][idx] = draft[form][idx + 1];
          draft[form][idx + 1] = section;
        }
      }
    },
    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== "custom") {
        draft[form].splice(idx, 1);
      }
    },
    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
  },
});

export const {
  changeProfile,
  changeWorkExperiences,
  changeEducations,
  changeProjects,
  changeOtherProjects,
  changeSkills,
  changeTechnologies,
  changeLanguages,
  changeCustom,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIdx,
  setResume,
  removeSkill,
  addSkill,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectLanguages = (state: RootState) => state.resume.languages;
export const selectWorkExperiences = (state: RootState) =>
  state.resume.workExperiences;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectProjects = (state: RootState) => state.resume.projects;
export const selectOtherProjects = (state: RootState) => state.resume.otherProjects;
export const selectSkillsAndTechnologies = (state: RootState) => state.resume.skillsAndTechnologies;
export const selectCustom = (state: RootState) => state.resume.custom;

export default resumeSlice.reducer;
