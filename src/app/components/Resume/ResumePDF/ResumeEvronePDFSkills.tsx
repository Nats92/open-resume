import { Image, Text, View } from "@react-pdf/renderer";
import {
  ResumePDFBulletList, ResumePDFImage,
} from "components/Resume/ResumePDF/common";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import type { ResumeSkill } from "lib/redux/types";
import logo from 'public/logo.svg';

export const ResumeEvronePDFSkills = ({
  heading,
  skills,
  themeColor,
  isPDF,
}: {
  heading: string;
  skills: ResumeSkill[];
  themeColor: string;
  isPDF: boolean;
}) => {
  const featuredSkillsWithText = skills.filter((item) => item.skill);

  return (
    <View>
      <Text>{heading}</Text>
      <View
        style={{
          ...styles.flexCol,
          marginTop: spacing["2"]
        }}
      >
      {featuredSkillsWithText?.map(({ skill, experience }, idx) => {
        const iconName = skill.replaceAll(/\s/g, '').toLowerCase();
        return (
          <View style={{ marginBottom: spacing[2] }} key={idx}>
            <ResumePDFImage
              isPDF={isPDF}
              style={{ color: themeColor, fontSize: spacing['9'] }}
              src={`devicon/icons/${iconName}/${iconName}-original.svg`}
              width={30}
              height={30}
              alt={skill}
            />
            <Text>{skill}</Text>
            <Text break="true">{experience} лет</Text>
          </View>
        );
      })}
      </View>
    </View>
  );
};


