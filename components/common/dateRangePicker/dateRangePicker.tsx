import ru from "date-fns/esm/locale/ru";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from "react-text-mask";
import styles from './dateRangePickerStyle.scss';

const DATE_FORMAT: string = 'dd.MM.yyyy';
const DATE_MASK: (string | RegExp)[] = [/[0-3]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/];

interface AdminStatisticsPeriodSelectionProps {
    selectedDateStart: Date | null;
    selectedDateEnd: Date | null;
    eventChangeDateStart: (selectedDate: Date | null) => void;
    eventChangeDateEnd: (selectedDate: Date | null) => void;
    eventFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    isClearable?: boolean
    classNameInputDateWrapper?: string;
    placeholderTextStart?: string;
    placeholderTextEnd?: string;
}

function TodayButton() {
    return (<span className={styles.buttonToday}>{'Сегодня'}</span>);
}

function DateRangePicker(props: AdminStatisticsPeriodSelectionProps) {

    const cssClassInputDateWrapper: string = props.classNameInputDateWrapper ?
        `${props.classNameInputDateWrapper} ${styles.inputDateWrapper}` :
        styles.inputDateWrapper;

    return (
        <div className={styles.componentContainer}>
            <div className={cssClassInputDateWrapper}>
                <DatePicker
                    className={styles.inputDate}
                    isClearable={props.isClearable}
                    dateFormat={DATE_FORMAT}
                    locale={ru}
                    selected={props.selectedDateStart}
                    onChange={props.eventChangeDateStart}
                    onFocus={props.eventFocus}
                    shouldCloseOnSelect={true}
                    clearButtonClassName={styles.buttonClearSelectedDate}
                    showWeekNumbers={true}
                    fixedHeight={true}
                    closeOnScroll={true}
                    selectsStart={true}
                    startDate={props.selectedDateStart}
                    endDate={props.selectedDateEnd}
                    maxDate={props.selectedDateEnd}
                    placeholderText={props.placeholderTextStart}
                    customInput={
                        <MaskedInput
                            mask={DATE_MASK}
                        />
                    }
                    todayButton={
                        <TodayButton/>
                    }
                />
            </div>
            <span className={styles.dateSeparator}>{'-'}</span>
            <div className={cssClassInputDateWrapper}>
                <DatePicker
                    className={styles.inputDate}
                    isClearable={props.isClearable}
                    dateFormat={DATE_FORMAT}
                    locale={ru}
                    selected={props.selectedDateEnd}
                    onChange={props.eventChangeDateEnd}
                    onFocus={props.eventFocus}
                    shouldCloseOnSelect={true}
                    clearButtonClassName={styles.buttonClearSelectedDate}
                    showWeekNumbers={true}
                    fixedHeight={true}
                    closeOnScroll={true}
                    selectsEnd={true}
                    startDate={props.selectedDateStart}
                    endDate={props.selectedDateEnd}
                    minDate={props.selectedDateStart}
                    placeholderText={props.placeholderTextEnd}
                    customInput={
                        <MaskedInput
                            mask={DATE_MASK}
                        />
                    }
                    todayButton={
                        <TodayButton/>
                    }
                />
            </div>
        </div>
    );
}

export default React.memo(DateRangePicker);
