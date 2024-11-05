import {Theme} from "react-select";

const themeConfig = (inputTheme: Theme) => ({
    ...inputTheme,
    borderRadius: 10,
    colors: {
        ...inputTheme.colors,
        primary: '#00c6ff',
        primary25: '#b1ebff',
        neutral20: '#535353',
        neutral0: 'white'
    },
});

export default themeConfig;
