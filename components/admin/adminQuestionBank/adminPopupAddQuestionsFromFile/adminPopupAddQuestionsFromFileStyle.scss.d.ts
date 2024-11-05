export type Styles = {
  'buttonsContainer': string;
  'errorText': string;
  'startSelectedFileContainer': string;
  'titleLine': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
