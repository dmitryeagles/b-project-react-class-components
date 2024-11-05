export type Styles = {
  'bigHeaderArea': string;
  'contentContainer': string;
  'contentPage': string;
  'headerContentContainer': string;
  'linkBack': string;
  'pageTitle': string;
  'pageTitleContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
