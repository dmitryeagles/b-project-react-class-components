import React from "react";
import styles from './emulationInputReadOnlyStyle.scss';

interface EmulationInputReadOnlyProps {
    readonly value: string | number;
    readonly label: string;
}

function EmulationInputReadOnly(props: EmulationInputReadOnlyProps) {
    return (
        <div className={styles.componentContainer}>
            <span className={styles.inputLabel}>{props.label}</span>
            <span className={styles.inputReadOnly}>
                {props.value}
            </span>
        </div>
    );
}

export default React.memo(EmulationInputReadOnly);