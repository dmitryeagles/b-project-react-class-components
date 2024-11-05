import InputNumber from 'rc-input-number';
import React from "react";
//import 'rc-input-number/assets/index.css';
import styles from './inputNumericStyle.scss'

export type InputNumericValueChange = number | undefined | null;
export type InputNumericValue = number | undefined;

interface InputNumericProps {
    readonly value?: InputNumericValue;
    readonly eventChange?: (changeNumericValue: InputNumericValueChange) => void;
    readonly errorText?: string;
    readonly min?: number;
    readonly max?: number;
    readonly className?: string;
    readonly callbackFormatter?: (inputNumber: InputNumericValueChange) => string;
    readonly placeholder?: string;
    readonly precision?: number | undefined;
}

const upHandler = <span className={`${styles.buttonHandler} ${styles.buttonHandlerPlus}`}>{'+'}</span>;
const downHandler = <span className={`${styles.buttonHandler} ${styles.buttonHandlerMinus}`}>{'-'}</span>;

function InputNumeric(props: InputNumericProps) {

    let cssClass = props.className ? `${styles.inputNumeric} ${props.className}` : styles.inputNumeric;

    if (props.errorText) {
        cssClass += ' ' + styles.haveError;
    }

    return (
        <div className={styles.componentContainer}>
            <InputNumber
                decimalSeparator={','}
                className={cssClass}
                value={props.value}
                max={props.max}
                min={props.min}
                onChange={props.eventChange}
                upHandler={upHandler}
                downHandler={downHandler}
                formatter={props.callbackFormatter}
                type={'text'}
                placeholder={props.placeholder}
                precision={props.precision}
            />
            {
                props.errorText ? <div className={styles.errorText}>{props.errorText}</div> : null
            }
        </div>
    );
}

export default React.memo(InputNumeric);
