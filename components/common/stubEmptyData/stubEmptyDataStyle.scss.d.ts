export type Styles = {
  'componentContainer': string;
  'emptyDataTextContainer': string;
  'imageContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
