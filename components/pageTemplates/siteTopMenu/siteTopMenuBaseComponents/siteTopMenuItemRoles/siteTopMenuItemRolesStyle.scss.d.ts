export type Styles = {
  'buttonRoles': string;
  'fullSizeBtn': string;
  'mobileBtn': string;
  'mobileBtnRoles': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
