export type Styles = {
  'attestationPublicName': string;
  'buttonsContainer': string;
  'editorPercentWrapper': string;
  'errorText': string;
  'inputDateWrapper': string;
  'inputText': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
