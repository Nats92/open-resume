import { Packer } from "docx";
import { Settings } from '../../lib/redux/settingsSlice';
import { Resume } from '../../lib/redux/types';
import { makeDocument } from './ResumeWord/make-document';

export async function downloadDocx(resume: Resume, settings: Settings) {
  const doc = await makeDocument(resume, settings);

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `CV-${resume.profile.name}.docx`;
  link.click();

  URL.revokeObjectURL(url);
}
