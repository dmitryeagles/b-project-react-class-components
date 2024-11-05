import ru from "date-fns/esm/locale/ru";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from "react-text-mask";
import styles from './authorizationInputDateStyle.scss';

const DATE_FORMAT: string = 'dd.MM.yyyy';
const DATE_MASK: (string | RegExp)[] = [/[0-3]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
const DATE_PLACEHOLDER: string = 'дд.мм.гггг';
const MAX_DATE: Date = new Date();

interface AuthorizationInputDateProps {
    dateValue?: Date | null;
    textLabel: string;
    textError?: string;
    eventFocus: () => void;
    eventChange: (selectedDate: Date | null) => void;
}

function AuthorizationInputDate(props: AuthorizationInputDateProps) {

    const cssClassInputStatus: string = props.textError ? styles.authorizationInputError : styles.authorizationInputNormal;

    return (
        <div className={styles.componentContainer}>
            <div
                className={styles.labelInput}
            >
                {props.textLabel}
            </div>
            <DatePicker
                fixedHeight={true}
                isClearable
                placeholderText={DATE_PLACEHOLDER}
                onFocus={props.eventFocus}
                className={`${styles.authorizationInputDate} ${cssClassInputStatus}`}
                dateFormat={DATE_FORMAT}
                locale={ru}
                selected={props.dateValue}
                onChange={props.eventChange}
                clearButtonClassName={styles.buttonClearSelectedDate}
                maxDate={MAX_DATE}
                customInput={
                    <MaskedInput
                        mask={DATE_MASK}
                    />
                }
            />
            {
                props.textError ? <div className={styles.errorTextContainer}>{props.textError}</div> : null
            }
        </div>
    );

}

export default React.memo(AuthorizationInputDate);
