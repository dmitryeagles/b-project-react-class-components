export type Styles = {
  'icoConfirm': string;
  'icoContainer': string;
  'icoDelete': string;
  'icoError': string;
  'icoSuccess': string;
  'messageContainer': string;
  'popupConfirmButtonsCancel': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
