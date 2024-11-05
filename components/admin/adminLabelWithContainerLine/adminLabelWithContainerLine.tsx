import React from "react";
import styles from './adminLabelWithContainerLineStyle.scss';

interface AdminLabelWithContainerLineProps {
    children: React.ReactNode;
    label: string;
    classNameLabelIco?: string;
    className?: string;
}

/**
 * Заголовок и какой-то контент, на одной строке
 * @param props
 * @constructor
 */
function AdminLabelWithContainerLine(props: AdminLabelWithContainerLineProps) {
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

export default React.memo(AdminLabelWithContainerLine);
