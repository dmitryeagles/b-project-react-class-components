export type Styles = {
  'answerContentHTML': string;
  'cellStatus': string;
  'cellStatusError': string;
  'cellStatusSuccess': string;
  'questionContentHtml': string;
  'reportMainInfoContainer': string;
  'tableContainer': string;
  'textPrimary': string;
  'userAnswer': string;
  'userAnswerFirst': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
