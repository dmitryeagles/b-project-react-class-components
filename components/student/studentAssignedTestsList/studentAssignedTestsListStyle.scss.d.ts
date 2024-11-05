export type Styles = {
  'bottomButton': string;
  'linkStartTest': string;
  'remainedAttemptCountFew': string;
  'remainedAttemptCountMedium': string;
  'remainedAttemptCountMuch': string;
  'testItemContainer': string;
  'testItemContentContainer': string;
  'testName': string;
  'testStatusNotAvailable': string;
  'testStatusSuccess': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
