export type Styles = {
  'componentContainer': string;
  'displayItems1Column': string;
  'displayItems2Column': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
