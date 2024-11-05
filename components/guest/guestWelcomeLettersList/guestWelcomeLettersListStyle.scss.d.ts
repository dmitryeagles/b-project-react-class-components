export type Styles = {
  'componentContainer': string;
  'image': string;
  'newsContainer': string;
  'newsTextContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
