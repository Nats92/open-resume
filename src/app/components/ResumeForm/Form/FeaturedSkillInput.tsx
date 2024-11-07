import React from "react";
import { INPUT_CLASS_NAME } from "components/ResumeForm/Form/InputGroup";
import { ResumeSkill } from '../../../lib/redux/types';
import { DeleteIconButton } from './IconButton';

export const FeaturedSkillInput = ({
  skill,
  experience,
  setSkillRating,
  className,
  handleDelete,
}: {
  skill: string;
  experience: number | string;
  setSkillRating: (field: keyof ResumeSkill, value: string) => void;
  className?: string;
  handleDelete?: () => void;
}) => {
  return (
    <div className={`flex ${className} gap-2 align-center`}>
      <input
        name="skill"
        type="text"
        value={skill}
        placeholder="Skill"
        onChange={(e) => setSkillRating('skill', e.target.value)}
        className={INPUT_CLASS_NAME}
      />

      <input
        type="text"
        name="experience"
        value={experience}
        placeholder="experience"
        onChange={(e) => setSkillRating('experience', e.target.value)}
        className={INPUT_CLASS_NAME}
      />

      {handleDelete && (
        <DeleteIconButton
          onClick={handleDelete}
          tooltipText="Delete skill"
        />
      )}
    </div>
  );
};
