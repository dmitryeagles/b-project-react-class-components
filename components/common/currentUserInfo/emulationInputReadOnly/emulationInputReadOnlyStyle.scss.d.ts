export type Styles = {
  'componentContainer': string;
  'inputLabel': string;
  'inputReadOnly': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
