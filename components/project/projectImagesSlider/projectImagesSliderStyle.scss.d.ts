export type Styles = {
  'componentContainer': string;
  'componentContainerDefaultStyle': string;
  'imageContainer': string;
  'imagePublicName': string;
  'imageZoomCursor': string;
  'sliderButton': string;
  'sliderButtonLeft': string;
  'sliderButtonRight': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
