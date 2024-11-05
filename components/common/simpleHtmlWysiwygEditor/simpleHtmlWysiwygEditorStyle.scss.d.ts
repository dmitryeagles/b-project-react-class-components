export type Styles = {
  'editorContainer': string;
  'editorContainerError': string;
  'errorText': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
