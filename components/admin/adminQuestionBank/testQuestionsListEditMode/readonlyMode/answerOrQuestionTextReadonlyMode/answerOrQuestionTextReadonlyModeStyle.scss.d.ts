export type Styles = {
  'containerReadonlyText': string;
  'placeholderText': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
