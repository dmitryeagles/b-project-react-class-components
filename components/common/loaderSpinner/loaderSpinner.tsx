import React from "react";
import styles from './loaderSpinnerStyle.scss';

interface LoaderSpinnerProps {
    loadingText: string;
    classNameSpinner?:string;
}

/**
 * Загрузка
 * @param props
 * @constructor
 */
function LoaderSpinner(props: LoaderSpinnerProps) {
    const cssClass: string = props.classNameSpinner ? `${props.classNameSpinner} ${styles.loaderSpinner}` : `${styles.loaderSpinnerSize} ${styles.loaderSpinner}`;
    return (
        <div className={styles.componentContainer}>
            <div className={cssClass}/>
            <div className={styles.ladingText}>{props.loadingText}</div>
        </div>
    );
}

export default React.memo(LoaderSpinner);
