export type Styles = {
  'buttonsContainer': string;
  'categoryContentContainer': string;
  'checkBoxActive': string;
  'checkBoxSelectedTemplateItem': string;
  'errorText': string;
  'inputText': string;
  'popupBodySize': string;
  'templateContainer': string;
  'templateItemContainer': string;
  'templateItemContainerActive': string;
  'templateItemContent': string;
  'templateTitle': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
