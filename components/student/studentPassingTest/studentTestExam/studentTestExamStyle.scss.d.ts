export type Styles = {
  'progressBarContainer': string;
  'questionsButtonsContainer': string;
  'titleAnswersList': string;
  'titleQuestion': string;
  'topButtonsContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
