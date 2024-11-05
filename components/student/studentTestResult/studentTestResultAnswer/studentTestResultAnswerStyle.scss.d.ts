export type Styles = {
  'answerContent': string;
  'answerContentHTML': string;
  'answerFalse': string;
  'answerHelpText': string;
  'answerHelpTextFalse': string;
  'answerHelpTextTrue': string;
  'answerTrue': string;
  'checkBox': string;
  'checkBoxChecked': string;
  'componentContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
