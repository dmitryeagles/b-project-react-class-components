export type Styles = {
  'blueLighten': string;
  'componentContainer': string;
  'greenLighten': string;
  'itemContent': string;
  'itemLabel': string;
  'itemTitle': string;
  'orangeLighten': string;
  'progressBar': string;
  'progressLineContainer': string;
  'progressPercent': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
