export type Styles = {
  'buttonShowComments': string;
  'commentDate': string;
  'commentText': string;
  'simpleListItem': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
