export type Styles = {
  'animationShowQuestionAnswers': string;
  'answerContent': string;
  'buttonShowAnswers': string;
  'buttonShowAnswersClose': string;
  'buttonShowAnswersContainer': string;
  'buttonShowAnswersOpen': string;
  'questionContent': string;
  'questionTextContainer': string;
  'questionTextLabel': string;
  'questionTextLabelIco': string;
  'testAnswer': string;
  'testAnswerFalse': string;
  'testAnswersListContainer': string;
  'testAnswerTrue': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
