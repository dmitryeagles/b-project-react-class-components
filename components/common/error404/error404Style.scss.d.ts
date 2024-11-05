export type Styles = {
  'animationContainer': string;
  'componentContainer': string;
  'containerText': string;
  'homeLink': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
