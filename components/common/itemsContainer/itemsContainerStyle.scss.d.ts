export type Styles = {
  'componentContainer': string;
  'viewItemsOneColumn': string;
  'viewItemsThreeColumn': string;
  'viewItemsTwoColumn': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
