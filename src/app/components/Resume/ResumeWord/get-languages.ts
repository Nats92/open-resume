import { Paragraph, TextRun } from 'docx';
import { ResumeLanguage } from '../../../lib/redux/types';
import { getHeading } from './get-heading';

export function getLanguages(languages: ResumeLanguage[]) {
  return [
    getHeading('языки'),
    ...languages.map(({ language, level }) => (
      new Paragraph(`${language} ${level}`)
    ))
  ]
}
