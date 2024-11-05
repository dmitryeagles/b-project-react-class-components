export type Styles = {
  'buttonShowDetailUserInfo': string;
  'buttonShowDetailUserInfoClose': string;
  'buttonShowDetailUserInfoContainer': string;
  'buttonShowDetailUserInfoOpen': string;
  'buttonShowHistoryUserInfo': string;
  'buttonShowHistoryUserInfoContainer': string;
  'itemUser': string;
  'needChangePassword': string;
  'needChangePasswordContainer': string;
  'needChangePasswordHelpText': string;
  'simpleListItem': string;
  'userFullName': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
