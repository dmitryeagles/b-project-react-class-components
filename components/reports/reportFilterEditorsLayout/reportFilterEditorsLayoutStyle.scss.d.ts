export type Styles = {
  'componentContainer': string;
  'layoutOneColumn': string;
  'layoutThreeColumn': string;
  'layoutTwoColumn': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
