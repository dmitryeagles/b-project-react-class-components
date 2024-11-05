export type Styles = {
  'buttonLoginSystem': string;
  'buttonRecoverPassword': string;
  'fullSizeBtn': string;
  'mobileAuthBtnLogin': string;
  'mobileAuthBtnRecoverPassword': string;
  'mobileBtn': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
