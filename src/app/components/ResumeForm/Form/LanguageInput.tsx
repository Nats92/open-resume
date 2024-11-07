import React from "react";
import { INPUT_CLASS_NAME } from "components/ResumeForm/Form/InputGroup";
import { ResumeLanguage, ResumeSkill } from '../../../lib/redux/types';

export const LanguageInput = ({
  language,
  level,
  changeLanguage,
}: {
  language: string;
  level: string;
  changeLanguage: (field: keyof ResumeLanguage, value: string) => void;
}) => {
  return (
    <div className="flex gap-2 col-span-5">
      <input
        name="language"
        type="text"
        value={language}
        placeholder="Language"
        onChange={(e) => changeLanguage('language', e.target.value)}
        className={INPUT_CLASS_NAME}
      />

      <input
        type="text"
        name="level"
        value={level}
        placeholder="Level"
        onChange={(e) => changeLanguage('level', e.target.value)}
        className={INPUT_CLASS_NAME}
      />
    </div>
  );
};
