export type Styles = {
  'radioButton': string;
  'radioButtonActive': string;
  'radioButtonContainer': string;
  'selectedRadioButton': string;
  'voteTitle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
