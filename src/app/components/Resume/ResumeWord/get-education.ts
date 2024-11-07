import { BorderStyle, IParagraphPropertiesOptions, Paragraph, TextRun } from 'docx';
import { ResumeEducation } from '../../../lib/redux/types';
import { BASE_SPACING } from './const';
import { getHeading } from './get-heading';


function getDescriptions(descriptions: ResumeEducation['descriptions']) {
  if (!descriptions) {
    return [];
  }

  return Array.isArray(descriptions)
    ? descriptions.map((description) => new TextRun({ text: description, break: 1 }))
    : [new TextRun({ text: descriptions, break: 1 })]
}

export function getEducation(educations: ResumeEducation[]) {
  return [
    getHeading("образование"),
    ...educations.map(({ school, degree, date, descriptions }, idx) => {
      const descriptionParagraphs = getDescriptions(descriptions);

      const children = [new TextRun({ text: school })];

      if (date) {
        children.push(new TextRun({ text: date, break: 1 }));
      }
      if (degree) {
        children.push(new TextRun({ text: degree, break: 1 }));
      }
      if (descriptionParagraphs) {
        children.push(...descriptionParagraphs);
      }

      const showBorder = educations.length > 1 && idx < educations.length - 1;

      return new Paragraph({
        children,
        spacing: BASE_SPACING,
        border: showBorder ? { bottom: { style: BorderStyle.DASHED, size: 1, space: 3, color: '808080' } } : undefined,
      });
    }),
  ]
}
