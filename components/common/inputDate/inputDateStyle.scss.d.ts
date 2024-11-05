export type Styles = {
  'buttonClearSelectedDate': string;
  'buttonToday': string;
  'componentContainer': string;
  'errorText': string;
  'inputDate': string;
  'inputDateError': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
