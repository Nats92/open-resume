"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { ResumePDF } from "components/Resume/ResumePDF";
import { ResumeEvrone } from "components/Resume/ResumePDF/ResumeEvrone";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "components/Resume/ResumeControlBar";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { useAppSelector } from "lib/redux/hooks";
import { selectResume } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "components/fonts/NonEnglishFontsCSSLoader";
import { STYLE_TYPE } from './const';
import { downloadDocx } from './download-docx';

const STYLE_TYPE_TO_COMPONENT = {
  [STYLE_TYPE.default]: ResumePDF,
  [STYLE_TYPE.evrone]: ResumeEvrone,
}

export const Resume = ({ type }: { type:  typeof STYLE_TYPE[keyof typeof STYLE_TYPE] }) => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const PDFComponent = STYLE_TYPE_TO_COMPONENT[type];
  const handleDownloadDocx = async () => await downloadDocx(resume, settings);

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        <div className="relative">
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
            <ResumeIframeCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
            >
              <PDFComponent
                resume={resume}
                settings={settings}
                isPDF={DEBUG_RESUME_PDF_FLAG}
              />
            </ResumeIframeCSR>
          </section>
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={<PDFComponent resume={resume} settings={settings} isPDF={true} />}
            fileName={resume.profile.name + " - Resume"}
            handleDownloadDocx={handleDownloadDocx}
          />
        </div>
        <ResumeControlBarBorder />
      </div>
    </>
  );
};
