export type Styles = {
  'actionButton': string;
  'actionButtonChooseAnotherFile': string;
  'actionButtonResetSelectedFile': string;
  'chooseFile': string;
  'errorText': string;
  'inputFileHidden': string;
  'lineFileInfo': string;
  'removeCurrentFile': string;
  'selectedFileContainer': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
