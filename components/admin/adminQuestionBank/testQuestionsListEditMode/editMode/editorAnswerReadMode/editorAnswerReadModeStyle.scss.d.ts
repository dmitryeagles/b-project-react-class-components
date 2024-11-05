export type Styles = {
  'answerStatusReadonly': string;
  'answerStatusReadonlyFalse': string;
  'answerStatusReadonlyTrue': string;
  'answerTextLabel': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
