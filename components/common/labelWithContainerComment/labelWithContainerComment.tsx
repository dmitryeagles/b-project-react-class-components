import React from "react";
import styles from './labelWithContainerCommentStyle.scss';

interface LabelWithContainerCommentProps {
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
function LabelWithContainerComment(props: LabelWithContainerCommentProps) {
    const cssClassLabel: string = props.classNameLabelIco ?
        `${styles.labelContainer} ${styles.labelIco} ${props.classNameLabelIco}` :
        styles.labelContainer;

    const cssClassName: string = props.className ? `${props.className} ${styles.componentContainer}` : `${styles.componentContainer}`;

    const cssClassIcon: string = props.className ? `${props.className} ${styles.commentTextLabelIco}` : `${styles.commentTextLabelIco}`;

    return (
        <>
        <div className={cssClassName}>
            <span className={cssClassLabel}>
                <span>{props.label}</span>
                <span className={cssClassIcon}>!</span>
            </span>
            {props.children}
        </div>
        </>
    );
}

export default React.memo(LabelWithContainerComment);
