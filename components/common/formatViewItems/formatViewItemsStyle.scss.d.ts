export type Styles = {
  'componentContainer': string;
  'isActive': string;
  'lineIco': string;
  'tileIco': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
