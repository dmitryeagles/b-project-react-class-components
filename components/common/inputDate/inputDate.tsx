import ru from "date-fns/esm/locale/ru";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from "react-text-mask";
import styles from './inputDateStyle.scss';

const DATE_FORMAT: string = 'dd.MM.yyyy';
const DATE_MASK: (string | RegExp)[] = [/[0-3]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];
const DATE_PLACEHOLDER: string = 'дд.мм.гггг';

function TodayButton() {
    return (<span className={styles.buttonToday}>{'Сегодня'}</span>);
}

interface InputDateProps {
    className?: string;
    errorText?: string;
    isClearable?: boolean;
    selectedDate: Date | null;
    minDate?: Date | null;
    maxDate?: Date | null;
    disabled?: boolean;
    showWeekNumbers?: boolean;
    shouldCloseOnSelect?: boolean;
    fixedHeight?: boolean;
    readOnly?: boolean;
    eventChangeDate: (selectedDate: Date | null) => void;
    eventFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

function InputDate(props: InputDateProps) {
    let cssClass: string = props.className ? `${styles.inputDate} ${props.className}` : styles.inputDate;

    if (props.errorText) {
        cssClass = `${styles.inputDateError} ${cssClass}`;
    }

    return (
        <div className={styles.componentContainer}>
            <DatePicker
                isClearable={props.isClearable}
                className={cssClass}
                dateFormat={DATE_FORMAT}
                locale={ru}
                selected={props.selectedDate}
                onChange={props.eventChangeDate}
                onFocus={props.eventFocus}
                shouldCloseOnSelect={props.shouldCloseOnSelect}
                clearButtonClassName={styles.buttonClearSelectedDate}
                disabled={props.disabled}
                showWeekNumbers={props.showWeekNumbers}
                fixedHeight={props.fixedHeight ?? true}
                readOnly={props.readOnly}
                closeOnScroll={true}
                minDate={props.minDate}
                maxDate={props.maxDate}
                customInput={
                    <MaskedInput
                        mask={DATE_MASK}
                        placeholder={DATE_PLACEHOLDER}
                    />
                }
                todayButton={
                    <TodayButton/>
                }
            />
            {
                props.errorText ? <div className={styles.errorText}>{props.errorText}</div> : null
            }
        </div>
    );
}

export default React.memo(InputDate);
