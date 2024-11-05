export type Styles = {
  'errorText': string;
  'inputStatusError': string;
  'inputText': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
