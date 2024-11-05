export type Styles = {
  'attestationItemContainer': string;
  'attestationItemContentContainer': string;
  'attestationName': string;
  'buttonAction': string;
  'buttonActionDelete': string;
  'buttonActionEdit': string;
  'buttonFinishAttestation': string;
  'buttonsActionsContainer': string;
  'copyAttestationContainer': string;
  'linkCopyAttestation': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
