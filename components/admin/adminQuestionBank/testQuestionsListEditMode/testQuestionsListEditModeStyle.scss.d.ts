export type Styles = {
  'answerCorrectEditor': string;
  'answerItemContainer': string;
  'answersListContainer': string;
  'answersListElements': string;
  'answersTitleContainer': string;
  'buttonsAnswerContainer': string;
  'deleteAnswerAction': string;
  'editAnswerAction': string;
  'editQuestionActions': string;
  'errorText': string;
  'icon': string;
  'optionsQuestionContainer': string;
  'titleAnswersContainer': string;
  'titleOptionsContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
