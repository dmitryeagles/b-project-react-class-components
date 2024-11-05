export type Styles = {
  'errorText': string;
  'popupBodySize': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;