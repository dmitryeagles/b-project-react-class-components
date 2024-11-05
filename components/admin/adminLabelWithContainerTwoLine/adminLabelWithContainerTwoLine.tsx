import React from "react";
import styles from './adminLabelWithContainerTwoLineStyle.scss';

interface AdminLabelWithContainerTwoLineProps {
    readonly children: React.ReactNode;
    readonly label: string;
    readonly helpText?: string;
    readonly isRequired?: boolean;
}

/**
 * Заголовок и какой то контент, на двух разных строках
 * @param props
 * @constructor
 */
function AdminLabelWithContainerTwoLine(props: AdminLabelWithContainerTwoLineProps){
    return(
        <div className={styles.componentContainer}>
            <div className={styles.labelContainer}>
                <span>
                  {props.label}
                </span>
                {
                    props.isRequired ?
                    <span
                        className={styles.requiredStar}
                        title={'Поле обязательно для заполнения'}
                    >
                        {'*'}
                    </span>
                    : null
                }
            </div>
            {
                props.helpText ?
                    <div className={styles.helpTextLine}>
                        {props.helpText}
                    </div> : null
            }
            <div className={styles.contentContainer}>
                {props.children}
            </div>
        </div>
    );
}

export default React.memo(AdminLabelWithContainerTwoLine);
