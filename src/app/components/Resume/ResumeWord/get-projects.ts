import { Paragraph, TextRun } from 'docx';
import { Resume, ResumeProject } from '../../../lib/redux/types';
import { BASE_SPACING } from './const';
import { getHeading } from './get-heading';

export function getProject({ name, period, stack, descriptions, mainTask, achievements }: ResumeProject) {
  const children = [];
  if (name) {
    children.push(new Paragraph({ children: [new TextRun({ text: name, size: 24 })], spacing: { beforeAutoSpacing: true } }));
  }
  const paragraphChildren = [];
  if (period) {
    paragraphChildren.push(new TextRun({ text: period }));
  }
  if (stack?.length) {
    paragraphChildren.push(new TextRun({ text: stack.join(', '), break: period ? 1 : 0 }));
  }
  if (mainTask) {
    paragraphChildren.push(new TextRun({ text: mainTask, break: stack?.length ? 1 : 0 }));
  }
  if (paragraphChildren.length) {
    children.push(new Paragraph({ children: paragraphChildren, spacing: { afterAutoSpacing: true } }));
  }
  if (descriptions?.length) {
    children.push(new Paragraph({ text: "Задачи:", spacing: BASE_SPACING }));
    children.push(...descriptions.map((task) => new Paragraph({
      bullet: { level: 0 },
      text: `${task};`,
    })));
  }
  if (achievements?.length) {
    children.push(new Paragraph({ text: "Личные результаты:", spacing: BASE_SPACING }));
    children.push(...achievements.map((achievement) => new Paragraph({
      bullet: { level: 0 },
      text: `${achievement};`,
    })));
  }

  return children;
}

export function getProjects(projects: ResumeProject[], otherProjects: Resume['otherProjects']) {
  return [
    getHeading('проекты', true),
    ...projects.map(getProject).flatMap((project) => project),
    new Paragraph({
      spacing: BASE_SPACING,
      children: [
        new TextRun({ text: "Другие проекты: ", bold: true, size: 24 }),
        new TextRun({ text: otherProjects })
      ],
    })
  ];
}
