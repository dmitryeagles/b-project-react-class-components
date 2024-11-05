import React from "react";
import styles from './labelWithContainerOnOneLineStyle.scss';

interface LabelWithContainerOnOneLineProps {
    readonly children: React.ReactNode;
    readonly label: string;
    readonly classNameLabelIco?: string;
    readonly className?: string;
}

/**
 * Заголовок и какой-то контент, на одной строке
 * @param props
 * @constructor
 */
function LabelWithContainerOnOneLine(props: LabelWithContainerOnOneLineProps) {
    const cssClassLabel: string = props.classNameLabelIco ?
        `${styles.labelContainer} ${styles.labelIco} ${props.classNameLabelIco}` :
        styles.labelContainer;

    const cssClassName: string = props.className ? `${props.className} ${styles.componentContainer}` : `${styles.componentContainer}`;

    return (
        <div className={cssClassName}>
            <span className={cssClassLabel}>{props.label}</span>
            {props.children}
        </div>
    );
}

export default React.memo(LabelWithContainerOnOneLine);
