export type Styles = {
  'animation_errorOpacityIn': string;
  'authorizationInput': string;
  'authorizationInputError': string;
  'authorizationInputNormal': string;
  'componentContainer': string;
  'errorTextContainer': string;
  'inputContainer': string;
  'inputIco': string;
  'inputIcoLock': string;
  'inputIcoLogin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
