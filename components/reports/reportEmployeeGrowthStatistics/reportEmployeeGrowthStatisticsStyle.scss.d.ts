export type Styles = {
  'container': string;
  'tableContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
