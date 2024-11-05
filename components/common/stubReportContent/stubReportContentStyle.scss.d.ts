export type Styles = {
  'componentContainer': string;
  'imageContainer': string;
  'imageStatusEmpty': string;
  'imageStatusError': string;
  'imageStatusNotCreated': string;
  'textContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
