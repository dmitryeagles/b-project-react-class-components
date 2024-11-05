import React from "react";
import styles from './standardPanelStyle.scss';

interface StandardPanelProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}

function StandardPanel(props: StandardPanelProps) {
    return (
        <div
            className={props.className ?
                `${props.className} ${styles.componentContainer}` :
                `${styles.panelStandardStyle} ${styles.componentContainer}`}>
            {props.children}
        </div>
    );
}

export default React.memo(StandardPanel);
