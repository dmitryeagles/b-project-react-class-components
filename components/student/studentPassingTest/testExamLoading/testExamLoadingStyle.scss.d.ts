export type Styles = {
  'animationContainer': string;
  'componentContainer': string;
  'loadingText': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
