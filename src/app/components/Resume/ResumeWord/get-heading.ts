import { Paragraph, TextRun } from 'docx';

export function getHeading(heading: string, filled?: boolean) {
  return new Paragraph({
    keepLines: true,
    keepNext: true,
    children: [new TextRun({ text: heading, allCaps: true })],
    shading: {
      fill: filled ? 'efefef' : undefined,
    },
    heading: 'Heading2',
  });
}
