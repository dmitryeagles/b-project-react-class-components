export type Styles = {
  'buttonsAlignCenter': string;
  'buttonsAlignLeft': string;
  'buttonsAlignRight': string;
  'buttonsContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
