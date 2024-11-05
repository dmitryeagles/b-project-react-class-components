export type Styles = {
  'componentContainer': string;
  'imageCertificate': string;
  'imageContainer': string;
  'imageEducator': string;
  'imageGuyWithEnvelopesColor': string;
  'imageProjectionsColor': string;
  'imageTaskDiaryColor': string;
  'imageUnknown': string;
  'mainCategoryItem': string;
  'textContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
