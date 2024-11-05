export type Styles = {
  'defaultStatus': string;
  'errorStatus': string;
  'largeButton': string;
  'successStatus': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
