export type Styles = {
  'icoFactory': string;
  'icoLevelName': string;
  'icoPriority': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
