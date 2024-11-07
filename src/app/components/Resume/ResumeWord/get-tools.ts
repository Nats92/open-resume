import { Paragraph, TextRun } from 'docx';
import { ResumeSkillAndTechnologies } from '../../../lib/redux/types';
import { BASE_SPACING } from './const';
import { getHeading } from './get-heading';

export function getTools({ tools }: ResumeSkillAndTechnologies) {
  return [
    getHeading('СУБД, инструменты', true),
    new Paragraph({ children: [new TextRun(tools)], spacing: BASE_SPACING })
  ]
}
