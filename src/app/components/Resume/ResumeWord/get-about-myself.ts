import { Paragraph, TextRun } from 'docx';
import { ResumeProfile } from '../../../lib/redux/types';
import { BASE_SPACING } from './const';
import { getHeading } from './get-heading';

export function getAboutMyself(profile: ResumeProfile) {
  return [
    getHeading('о себе'),
    new Paragraph({ children: [new TextRun(profile.aboutMyself)], spacing: BASE_SPACING }),
  ]
}
