export type Styles = {
  'progressBar': string;
  'progressBarContainer': string;
  'questionNumberProgressContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
