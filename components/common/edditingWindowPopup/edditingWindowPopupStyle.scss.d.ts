export type Styles = {
  'animation_popupOpacityIn': string;
  'buttonClosePopup': string;
  'containerButtonClose': string;
  'documentBodyOverflowHidden': string;
  'popupBackground': string;
  'popupBody': string;
  'popupBodySize': string;
  'popupContent': string;
  'popupContentContainer': string;
  'popupContentSize': string;
  'popupTitle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
