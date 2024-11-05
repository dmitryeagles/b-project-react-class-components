export type Styles = {
  'componentContainer': string;
  'linkBack': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;