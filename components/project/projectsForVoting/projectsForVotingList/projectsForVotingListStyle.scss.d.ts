export type Styles = {
  'contentWrapper': string;
  'dataWrapper': string;
  'imageSlider': string;
  'imageWrapper': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
