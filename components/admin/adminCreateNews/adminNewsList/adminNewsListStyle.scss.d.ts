export type Styles = {
  'componentContainer': string;
  'detailNewsText': string;
  'linkShowFile': string;
  'newsActive': string;
  'newsArchive': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
