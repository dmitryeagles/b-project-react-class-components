export type Styles = {
  'actionButton': string;
  'actionButtonChooseAnotherFile': string;
  'actionButtonResetSelectedFile': string;
  'actionButtonsContainer': string;
  'chooseFile': string;
  'errorText': string;
  'inputFileHidden': string;
  'lineFileInfo': string;
  'selectedFileContainer': string;
  'selectedFileTitle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
