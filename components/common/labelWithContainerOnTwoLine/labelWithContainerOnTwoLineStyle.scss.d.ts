export type Styles = {
  'componentContainer': string;
  'contentContainer': string;
  'helpTextLine': string;
  'labelContainer': string;
  'requiredStar': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
