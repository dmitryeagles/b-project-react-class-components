import React from "react";
import styles from './authHelpTextStyle.scss';

interface AuthHelpTextProps {
    helpText: string;
}

function AuthHelpText(props: AuthHelpTextProps) {
    return (
        <div className={styles.helpTextContainer}>{props.helpText}</div>
    );
}

export default React.memo(AuthHelpText);
