export type Styles = {
  'animation_popupOpacityIn': string;
  'buttonClosePopup': string;
  'imagePublicName': string;
  'popupBackground': string;
  'popupBodySize': string;
  'popupContent': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
