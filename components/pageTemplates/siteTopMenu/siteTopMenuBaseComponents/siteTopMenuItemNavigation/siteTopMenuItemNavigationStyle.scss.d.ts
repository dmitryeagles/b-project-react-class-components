export type Styles = {
  'buttonNavigation': string;
  'fullSizeBtn': string;
  'mobileBtn': string;
  'mobileBtnNavigation': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
