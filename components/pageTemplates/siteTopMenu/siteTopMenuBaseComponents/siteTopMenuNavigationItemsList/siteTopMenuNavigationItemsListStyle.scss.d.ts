export type Styles = {
  'animation_showMenu': string;
  'navigationLink': string;
  'navigationLinkActive': string;
  'navigationLinkDefault': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
