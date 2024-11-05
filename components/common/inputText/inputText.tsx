import React from "react";
import styles from './inputTextStyle.scss';

interface InputTextProps {
    readonly defaultValue?: string;
    readonly value?: string;
    readonly name?: string;
    readonly eventChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly eventFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    readonly className?: string;
    readonly errorText?: string;
    readonly isReadOnly?: boolean;
    readonly placeholder?: string | undefined;
    readonly autoFocus?: boolean | undefined;
}

/**
 * Input для вводы текста
 * @param props
 * @constructor
 */
function InputText(props: InputTextProps) {
    return (
        <div className={props.className}>
            <input
                placeholder={props.placeholder}
                name={props.name}
                className={props.errorText ? `${styles.inputStatusError} ${styles.inputText}` : styles.inputText}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={props.eventChange}
                onFocus={props.eventFocus}
                type={'text'}
                readOnly={props.isReadOnly}
                autoComplete={'off'}
                autoFocus={props.autoFocus}
            />
            {
                props.errorText ? <div className={styles.errorText}>{props.errorText}</div> : null
            }
        </div>
    );
}

export default React.memo(InputText);
