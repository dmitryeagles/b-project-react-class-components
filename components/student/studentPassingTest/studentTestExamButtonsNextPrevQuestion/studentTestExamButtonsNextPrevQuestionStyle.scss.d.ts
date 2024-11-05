export type Styles = {
  'actionButton': string;
  'buttonNextQuestion': string;
  'buttonPrevQuestion': string;
  'componentContainer': string;
  'disabledButton': string;
  'icoDisabledButton': string;
  'icoNextButton': string;
  'icoPrevButton': string;
  'questionControlButton': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
