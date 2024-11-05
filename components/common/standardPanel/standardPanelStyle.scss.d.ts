export type Styles = {
  'componentContainer': string;
  'panelStandardStyle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
