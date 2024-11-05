export type Styles = {
  'animation_popupOpacityIn': string;
  'buttonClosePopup': string;
  'containerButtonClose': string;
  'documentBodyOverflowHidden': string;
  'popupBackground': string;
  'popupBody': string;
  'popupContentContainer': string;
  'popupContentContainerWithCloseButton': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
