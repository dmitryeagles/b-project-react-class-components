export type Styles = {
  'actionButton': string;
  'actionButtonCancel': string;
  'actionButtonOk': string;
  'animation_popupOpacityIn': string;
  'buttonClosePopup': string;
  'containerActionsButtons': string;
  'containerButtonClose': string;
  'documentBodyOverflowHidden': string;
  'popupBackground': string;
  'popupBody': string;
  'popupBodySize': string;
  'popupContent': string;
  'popupContentContainer': string;
  'popupTitle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
