export type Styles = {
  'arrowNexPrevious': string;
  'arrowNext': string;
  'arrowPrevious': string;
  'componentContainer': string;
  'dropdownContainer': string;
  'itemsCount': string;
  'lineHelpInfo': string;
  'paginationContainer': string;
  'paginationLine': string;
  'totalItemsContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
