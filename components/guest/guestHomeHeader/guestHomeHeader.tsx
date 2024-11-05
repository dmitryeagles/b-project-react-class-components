import React from "react";
import styles from './guestHomeHeaderStyle.scss';

interface GuestHomeHeaderProps {
    readonly text: string;
}

function GuestHomeHeader(props: GuestHomeHeaderProps) {
    return (<div className={styles.componentContainer}>{props.text}</div>);
}

export default React.memo(GuestHomeHeader);
