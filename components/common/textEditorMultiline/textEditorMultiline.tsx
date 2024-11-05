import React from "react";
import styles from './textEditorMultilineStyle.scss';

interface TextEditorMultilineProps {
    value?: string | number | readonly string[];
    defaultValue?: string | number | readonly string[];
    eventChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    eventFocus?:(e: React.FocusEvent<HTMLTextAreaElement, Element>) =>void;
    className?: string;
    errorText?: string;
}

/**
 * Редактор многострочного текста
 * @param props
 * @constructor
 */
function TextEditorMultiline(props: TextEditorMultilineProps) {
    return (
        <div className={props.className ? props.className : styles.componentContainer}>
            <textarea
                className={props.errorText ? `${styles.textareaStatusError} ${styles.textarea}` :  styles.textarea}
                value={props.value}
                defaultValue={props.defaultValue}
                onChange={props.eventChange}
                onFocus={props.eventFocus}
            />
            {
                props.errorText ? <div className={styles.errorText}>{props.errorText}</div> : null
            }
        </div>
    );
}

export default React.memo(TextEditorMultiline);
