export type Styles = {
  'componentContainer': string;
  'newsContainer': string;
  'newsContentContainer': string;
  'newsCreated': string;
  'newsTextContainer': string;
  'newsTopicContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
