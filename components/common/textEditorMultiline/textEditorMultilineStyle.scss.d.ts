export type Styles = {
  'componentContainer': string;
  'errorText': string;
  'textarea': string;
  'textareaStatusError': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
