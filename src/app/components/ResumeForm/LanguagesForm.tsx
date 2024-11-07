import { Form, FormSection } from "components/ResumeForm/Form";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { selectLanguages, changeLanguages } from "lib/redux/resumeSlice";
import { ResumeLanguage } from '../../lib/redux/types';
import { LanguageInput } from './Form/LanguageInput';

export const LanguagesForm = () => {
  const languages = useAppSelector(selectLanguages);
  const dispatch = useAppDispatch();
  const form = "languages";
  const showDelete = languages.length > 1;

  return (
    <Form form={form} addButtonText="Add language">
      {languages.map(({ language, level }, idx) => {
        const handleLanguageChange = (
          idx: number,
          field: keyof ResumeLanguage,
          value: string
        ) => {
          dispatch(changeLanguages({field, idx, value}));
        };
        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== languages.length - 1;

        return (
          <FormSection
            key={idx}
            form={form}
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete language"
          >
            <LanguageInput
              key={idx}
              language={language}
              level={level}
              changeLanguage={(field, value) => {
                handleLanguageChange(idx, field, value);
              }}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};
