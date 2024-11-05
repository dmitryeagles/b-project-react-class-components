import React from "react";
import styles from './standardCheckboxStyle.scss';

interface StandardCheckboxProps {
    className?: string;
    isCheck: boolean;
    eventCheck:()=> void;
    publicText: string;
}

function StandardCheckbox(props: StandardCheckboxProps) {
    return (
        <div className={props.className ? `${props.className} ${styles.componentContainer}` : styles.componentContainer}>
            <span
                onClick={props.eventCheck}
                className={props.isCheck ?
                    `${styles.checkboxContainer} ${styles.checked}` :
                    styles.checkboxContainer}
            />
            <span>{props.publicText}</span>
        </div>
    );
}

export default React.memo(StandardCheckbox);
