import { AlignmentType, Document, Footer, Paragraph, TextRun } from 'docx';
import { Settings } from '../../../lib/redux/settingsSlice';
import { Resume } from '../../../lib/redux/types';
import { getDocumentBody } from './get-document-body';
import { getResumeHeader } from './get-resume-header';

export async function makeDocument(resume: Resume, settings: Settings) {
  const { profile } = resume;
  const { name } = profile;

  const header = await getResumeHeader(profile, settings);
  const body = await getDocumentBody(resume);

  return new Document({
    title: `CV - ${name}`,
    styles: {
      paragraphStyles: [
        {
          id: "customHeading1",
          name: "Custom Heading 1",
          run: {
            font: settings.fontFamily,
            color: settings.themeColor,
          },
        }
      ],
      default: {
        heading1: {
          run: {
            size: 36,
            font: settings.fontFamily,
            color: settings.themeColor,
          },
        },
        heading2: {
          run: {
            size: 28,
            font: settings.fontFamily,
            color: settings.themeColor,
            bold: true,
          },
          paragraph: {
            spacing: { before: 100, after: 100, line: 14 * 20, lineRule: 'exact' },
          }
        },
        listParagraph: {
          run: {
            language: { value: 'RU' },
          },
        },
        document: {
          paragraph: {
            spacing: { before: 80, after: 80, line: Number(settings.fontSize) * 20, lineRule: 'exact' },
          },
          run: {
            size: Number(settings.fontSize) * 2,
            font: settings.fontFamily,
            language: { value: 'RU' },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 240,
              bottom: 240,
              left: 240,
              right: 240,
            },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'mail@evrone.com', size: 24 })
                ],
                alignment: AlignmentType.CENTER,
              })
            ]
          }),
        },
        children: [header, body],
      },
    ],
  });
}
