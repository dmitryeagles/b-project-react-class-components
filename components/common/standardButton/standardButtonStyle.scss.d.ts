export type Styles = {
  'button': string;
  'buttonCancel': string;
  'buttonDisabled': string;
  'buttonOk': string;
  'buttonPrimary': string;
  'buttonSecondary': string;
  'buttonSize': string;
  'iconLeft': string;
  'iconRight': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
