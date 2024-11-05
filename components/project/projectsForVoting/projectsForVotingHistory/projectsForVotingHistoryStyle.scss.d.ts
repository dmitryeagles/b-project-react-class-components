export type Styles = {
  'itemVoteContainer': string;
  'lineUserComment': string;
  'lineUserFullName': string;
  'textContainer': string;
  'voteNumber': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
