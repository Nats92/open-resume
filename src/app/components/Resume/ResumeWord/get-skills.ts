import {
  HorizontalPositionAlign, HorizontalPositionRelativeFrom,
  ImageRun,
  Paragraph,
  Table,
  TableCell,
  TableRow, TextWrappingSide, TextWrappingType,
  VerticalAlign, VerticalPositionRelativeFrom,
  WidthType
} from 'docx';
import { ResumeSkill } from '../../../lib/redux/types';
import { RESET_CELL_BORDERS, RESET_TABLE_BORDERS } from './const';
import { getHeading } from './get-heading';

const svgToPng = async (iconName: string): Promise<ArrayBuffer | string> => {
  const icon = await import(`devicon/icons/${iconName}/${iconName}-original.svg`)
    .then((module) => {
      return module.default.src;
    })
    .catch(() => {
      return 'logo.svg';
    })

  return new Promise((resolve) => {
    const img = new Image();
    img.src = icon;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        resolve(blob?.arrayBuffer() || '');
      }, "image/png");
    };
  });
};


const getParagraphWithImage = async (skill: ResumeSkill) => {
  const { skill: iconName, experience } = skill;
  const blob = await svgToPng(iconName.replaceAll(/\s/g, '').toLowerCase());

  return new TableRow({
    children: [
      new TableCell({
        borders: RESET_CELL_BORDERS,
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 0, right: 0, bottom: 0, left: 0 },
        width: { size: 600 },
        children: [
          new Paragraph({
            spacing: { after: 0 },
            pageBreakBefore: false,
            children: [new ImageRun({
              type: 'png',
              data: blob,
              transformation: {
                width: 39,
                height: 39,
              },
            })]
          })
        ]
      }),
      new TableCell({
        width: { size: 1701 },
        margins: { right: 283, left: 141 },
        borders: RESET_CELL_BORDERS,
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ text: iconName }), new Paragraph(`${experience} лет`)],
      })
    ]
  });
}

export async function getSkills(skills: ResumeSkill[]): Promise<[Paragraph, Table]> {
  const skillsFiled = skills.filter((skill) => skill.skill);
  const skillRows = await Promise.all(skillsFiled.map((skill) => getParagraphWithImage(skill)));

  return [
    getHeading("фокус"),
    new Table({
      columnWidths: [600, 1701],
      borders: RESET_TABLE_BORDERS,
      rows: skillRows,
    }),
  ];
}
