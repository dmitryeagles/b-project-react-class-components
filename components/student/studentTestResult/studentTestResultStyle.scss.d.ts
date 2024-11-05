export type Styles = {
  'buttonReturnContainer': string;
  'numberOfPoints': string;
  'numberOfPointsContainer': string;
  'testResultTitle': string;
  'testResultTitleFalse': string;
  'testResultTitleTrue': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
