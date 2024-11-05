export type Styles = {
  'actionButton': string;
  'actionButtonAddFile': string;
  'actionButtonAddFileContainer': string;
  'actionButtonIncrease': string;
  'actionButtonRemoveFile': string;
  'actionButtonRemoveFileContainer': string;
  'actionButtonsContainer': string;
  'areaActionButtonsUploadImgFile': string;
  'errorTextInvalidFileImg': string;
  'inputFileImage': string;
  'withoutPreviewImage': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
