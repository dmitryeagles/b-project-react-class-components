export type Styles = {
  'componentContainer': string;
  'helpText': string;
  'readOnlySearchValue': string;
  'rightButton': string;
  'selectedId': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
