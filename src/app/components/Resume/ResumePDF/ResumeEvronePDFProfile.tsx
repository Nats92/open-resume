import { View } from "@react-pdf/renderer";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFImage,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";

export const ResumeEvronePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, summary } = profile;

  return (
    <ResumePDFSection style={{ padding: spacing['7'], paddingBottom: spacing[5], margin: '0 10pt', ...styles.flexRowCenterBetween, ...styles.borderBottom }}>
      <View style={styles.flexCol}>
        <ResumePDFText
          bold={true}
          themeColor={themeColor}
          style={{ fontSize: '25pt', marginBottom: 5 }}
        >
          {name}
        </ResumePDFText>
        {summary && <ResumePDFText style={{ fontSize: "20pt" }} >{summary}</ResumePDFText>}
      </View>

      <ResumePDFImage src="/assets/evrone.png" isPDF={isPDF} alt="Evrone" width={115} height={32} />
    </ResumePDFSection>
  );
};
