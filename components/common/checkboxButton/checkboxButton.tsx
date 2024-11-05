import React from "react";
import styles from './checkboxButtonStyle.scss';

interface CheckboxButtonProps {
    readonly isChecked: boolean;
    readonly publicText: string;
    readonly eventCheck: () => void;
    readonly className?: string;
}

function CheckboxButton(props: CheckboxButtonProps) {
    return (
        <div
            className={props.className ? `${props.className} ${styles.componentContainer}` : styles.componentContainer}
        >
             <span
                 onClick={props.eventCheck}
                 className={props.isChecked ?
                     `${styles.checkBoxActive} ${styles.checkBox}` :
                     styles.checkBox}
             />
            <span>{props.publicText}</span>
        </div>
    );
}

export default React.memo(CheckboxButton);