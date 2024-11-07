import { PlusSmallIcon } from '@heroicons/react/24/outline';
import { Form } from "components/ResumeForm/Form";
import { FeaturedSkillInput } from "components/ResumeForm/Form/FeaturedSkillInput";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import {
  addSkill,
  changeSkills,
  changeTechnologies,
  removeSkill,
  selectSkillsAndTechnologies
} from "lib/redux/resumeSlice";
import { ResumeSkill, ResumeSkillAndTechnologies } from '../../lib/redux/types';
import { Input } from './Form/InputGroup';

export const SkillsForm = () => {
  const { skills, infra, technologies, tools } = useAppSelector(selectSkillsAndTechnologies) || {};
  const dispatch = useAppDispatch();
  const form = "skillsAndTechnologies";

  const handleFeaturedSkillsChange = (
    idx: number,
    field: keyof ResumeSkill,
    value: string
  ) => {
    dispatch(changeSkills({ field, idx, value }));
  };
  const handleDeleteSkill = (idx: number) => {
    dispatch(removeSkill({ idx }));
  };

  const handleTechnologiesChange = (
    field: Exclude<keyof ResumeSkillAndTechnologies, 'skills'>,
    value: string
  ) => {
    dispatch(changeTechnologies({ field, value }));
  };

  return (
    <Form form={form}>
      <button
        type="button"
        onClick={() => {
          dispatch(addSkill());
        }}
        className="flex items-center rounded-md bg-white py-2 pl-3 pr-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <PlusSmallIcon
          className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        Add skill
      </button>
      {skills.map(({skill, experience}, idx) => (
        <FeaturedSkillInput
          key={idx}
          className="col-span-5"
          skill={skill}
          experience={experience}
          setSkillRating={(field, value) => {
            handleFeaturedSkillsChange(idx, field, value);
          }}
          handleDelete={() => handleDeleteSkill(idx)}
        />
      ))}

      <Input
        label="Technologies"
        labelClassName="col-span-full"
        name="technologies"
        placeholder="Flutter, React, Ruby on Rails, Android studio"
        value={technologies}
        onChange={handleTechnologiesChange}
      />
      <Input
        label="Tools"
        labelClassName="col-span-full"
        name="tools"
        placeholder="Jetpack, Firebase, MobX, Drift, SQLite"
        value={tools}
        onChange={handleTechnologiesChange}
      />
      <Input
        label="Infrastructure & Task managers"
        labelClassName="col-span-full"
        name="infra"
        placeholder="Jetpack, Firebase, MobX, Drift, SQLite"
        value={infra}
        onChange={handleTechnologiesChange}
      />
    </Form>
  );
};
