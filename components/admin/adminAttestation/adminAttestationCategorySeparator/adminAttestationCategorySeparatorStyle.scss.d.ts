export type Styles = {
  'buttonContainer': string;
  'componentContainer': string;
  'titleContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
