export type Styles = {
  'statusItem__assigned': string;
  'statusItem__failed': string;
  'statusItem__succeeded': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
