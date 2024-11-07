import {
  Table,
  TableCell,
  TableRow,
} from 'docx';
import { Resume } from '../../../lib/redux/types';
import { RESET_CELL_BORDERS, RESET_TABLE_BORDERS } from './const';
import { getAboutMyself } from './get-about-myself';
import { getEducation } from './get-education';
import { getInfra } from './get-infra';
import { getLanguages } from './get-languages';
import { getLocation } from './get-location';
import { getProjects } from './get-projects';
import { getSkills } from './get-skills';
import { getTechnologies } from './get-technologies';
import { getTools } from './get-tools';

// 1 пункт (pt) = 20 twips
// 1 дюйм (inch) = 1440 twips
// 1 см = 567 twips

export async function getDocumentBody(resume: Resume) {
  const skillsSection = await getSkills(resume.skillsAndTechnologies.skills);

  return new Table({
    borders: RESET_TABLE_BORDERS,
    columnWidths: [3105, 8277],
    rows: [
      new TableRow({
        cantSplit: false,
        children: [
          new TableCell({
            borders: RESET_CELL_BORDERS,
            width: { size: 3105 },
            margins: { right: 283, left: 183 },
            children: [
              ...skillsSection,
              ...getEducation(resume.educations),
              ...getLanguages(resume.languages),
              ...getLocation(resume.profile.location),
            ]
          }),
          new TableCell({
            borders: RESET_CELL_BORDERS,
            margins: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
            width: {
              size: 8277,
            },
            children: [
              ...getAboutMyself(resume.profile),
              ...getProjects(resume.projects, resume.otherProjects),
              ...getTechnologies(resume.skillsAndTechnologies),
              ...getTools(resume.skillsAndTechnologies),
              ...getInfra(resume.skillsAndTechnologies),
            ]
          }),
        ],
      }),
    ]
  });
}
