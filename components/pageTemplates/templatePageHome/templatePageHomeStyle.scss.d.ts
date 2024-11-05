export type Styles = {
  'bigHeaderImageContainer': string;
  'contentContainer': string;
  'contentPage': string;
  'headerBigTextGreetings': string;
  'headerContentContainer': string;
  'headerTextInfo': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
