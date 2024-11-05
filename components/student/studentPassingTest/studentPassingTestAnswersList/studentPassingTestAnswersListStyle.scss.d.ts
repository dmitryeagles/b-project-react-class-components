export type Styles = {
  'answerContainer': string;
  'answerContentHTML': string;
  'checkBox': string;
  'contentContainer': string;
  'radioButton': string;
  'userAnswerStatus': string;
  'userAnswerStatusChecked': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
