import { Paragraph, TextRun } from 'docx';
import { ResumeSkillAndTechnologies } from '../../../lib/redux/types';
import { BASE_SPACING } from './const';
import { getHeading } from './get-heading';

export function getTechnologies({ technologies }: ResumeSkillAndTechnologies) {
  return [
    getHeading('яп, фреймворки, библиотеки', true),
    new Paragraph({ children: [new TextRun(technologies)], spacing: BASE_SPACING })
  ]
}
