import { Paragraph, TextRun } from 'docx';
import { ResumeSkillAndTechnologies } from '../../../lib/redux/types';
import { BASE_SPACING } from './const';
import { getHeading } from './get-heading';

export function getInfra({ infra }: ResumeSkillAndTechnologies) {
  return [
    getHeading('инфраструктура, таск-менеджеры', true),
    new Paragraph({ children: [new TextRun(infra)], spacing: BASE_SPACING })
  ]
}
