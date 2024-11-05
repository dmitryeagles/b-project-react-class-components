export type Styles = {
  'columnNumber': string;
  'columnScore': string;
  'sumScore': string;
  'tableContainer': string;
  'tableScore': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
