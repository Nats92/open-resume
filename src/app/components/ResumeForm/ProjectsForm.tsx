import { Form, FormSection } from "components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "components/ResumeForm/Form/InputGroup";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectProjects, changeProjects, selectOtherProjects, changeOtherProjects } from "lib/redux/resumeSlice";
import type { ResumeProject } from "lib/redux/types";

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects);
  const otherProjects = useAppSelector(selectOtherProjects);
  const dispatch = useAppDispatch();
  const showDelete = projects.length > 1;

  return (
    <Form form="projects" addButtonText="Add Project">
      {projects.map(({ name, period, stack, achievements, descriptions, mainTask }, idx) => {
        const handleProjectChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<ResumeProject>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== projects.length - 1;

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText={"Delete project"}
          >
            <Input
              name="name"
              label="Project Name"
              placeholder="OpenResume"
              value={name}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <Input
              name="period"
              label="Period"
              placeholder="Winter 2022"
              value={period}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <Input
              name="mainTask"
              label="Main Task"
              placeholder="Create service"
              value={mainTask}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <BulletListTextarea
              name="stack"
              label="Stack"
              placeholder="Bullet points"
              value={stack}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <BulletListTextarea
              name="descriptions"
              label="Description"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
            <BulletListTextarea
              name="achievements"
              label="Achievements"
              placeholder="Bullet points"
              value={achievements}
              onChange={handleProjectChange}
              labelClassName="col-span-full"
            />
          </FormSection>
        );
      })}
      <Input
        name="otherProjects"
        label="Other Projects"
        placeholder="Project name, another project name"
        value={otherProjects}
        onChange={(_, value) => dispatch(changeOtherProjects({ value }))}
        labelClassName="col-span-full"
      />
    </Form>
  );
};
