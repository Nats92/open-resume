import {
  BorderStyle,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Paragraph,
  TextRun,
  VerticalPositionRelativeFrom
} from 'docx';
import evrone from 'public/assets/evrone.png';
import { Settings } from '../../../lib/redux/settingsSlice';
import { ResumeProfile } from '../../../lib/redux/types';


export const getResumeHeader = async ({ name, summary }: ResumeProfile, settings: Settings): Promise<Paragraph> => {
  const response = await fetch(evrone.src);
  const buffer = await response.arrayBuffer();

  return new Paragraph({
    style: 'customHeading1',
    children: [
      new TextRun({ text: name, size: 36, bold: true }),
      new TextRun({ size: 32, text: summary, break: 1 }),
      new ImageRun({
        type: 'jpg',
        data: buffer,
        transformation: {
          width: 139,
          height: 48,
        },
        floating: {
          horizontalPosition: {
            relative: HorizontalPositionRelativeFrom.INSIDE_MARGIN,
            offset: 6080000,
          },
          verticalPosition: {
            relative: VerticalPositionRelativeFrom.TOP_MARGIN,
            offset: 253000,
          }
        }
      })
    ],
    border: {
      bottom: {
        color: "#000000",
        space: 8,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
};
