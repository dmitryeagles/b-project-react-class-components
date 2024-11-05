export type Styles = {
  'buttonHandler': string;
  'buttonHandlerMinus': string;
  'buttonHandlerPlus': string;
  'componentContainer': string;
  'errorText': string;
  'haveError': string;
  'inputNumeric': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
