export type Styles = {
  'categoryContent': string;
  'categoryContentContainer': string;
  'categorySeparator': string;
  'errorText': string;
  'inputNewText': string;
  'inputReason': string;
  'inputText': string;
  'popupBodySize': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
