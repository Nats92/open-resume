import { Paragraph } from 'docx';
import { ResumeProfile } from '../../../lib/redux/types';
import { getHeading } from './get-heading';

export function getLocation(location: ResumeProfile['location']) {
  return [
    getHeading('локация'),
    new Paragraph(location),
  ]
}
