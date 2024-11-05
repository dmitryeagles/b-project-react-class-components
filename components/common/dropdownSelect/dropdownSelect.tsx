import React from "react";
import Select from 'react-select'
import {dropdownSelectCloseMenuOnScroll} from "./closeMenuOnScroll";
import DropdownNoOptionsMessage from "./dropdownNoOptionsMessage";
import styles from './dropdownSelectStyle.scss';
import styleConfig from "./dropdownStyleConfig";
import themeConfig from "./dropdownThemeConfig";

function indicatorSeparator() {
    return null;
}

export interface DropdownSelectItem<ValueType = number, OtherType = undefined> {
    readonly value: ValueType;
    readonly label: string;
    readonly other?: OtherType;
}

export type DropdownSelectCurrentSelectedItem<ValueType = number, OtherType = undefined> = DropdownSelectItem<ValueType, OtherType> | null;

interface EditorSelectProps<ValueType = number, OtherType = undefined> {
    className?: string;
    optionsList: DropdownSelectItem<ValueType, OtherType>[];
    selectedValue?: DropdownSelectCurrentSelectedItem<ValueType, OtherType>;
    placeholder?: string;
    isSearchable?: boolean;
    isClearable?: boolean;
    eventChange: (value: any) => void; // Тут TypeScript не может контекстуально определить тип, поэтому any
    eventFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

/**
 * Выпадающий список элементов
 * @param props
 * @constructor
 */
function DropdownSelect<ValueType, OtherType>(props: EditorSelectProps<ValueType, OtherType>) {
    return (
        <div className={props.className}>
            <Select
                onFocus={props.eventFocus}
                closeMenuOnScroll={dropdownSelectCloseMenuOnScroll}
                isClearable={props.isClearable}
                className={styles.dropdownSelectComponent}
                isSearchable={props.isSearchable ?? true}
                placeholder={props.placeholder ?? 'Поиск...'}
                noOptionsMessage={DropdownNoOptionsMessage}
                options={props.optionsList}
                value={props.selectedValue}
                onChange={props.eventChange}
                menuPlacement={'auto'}
                theme={themeConfig}
                styles={styleConfig}
                menuPosition={'fixed'}
                components={{
                    IndicatorSeparator: indicatorSeparator
                }}
            />
        </div>
    );
}

export default React.memo(DropdownSelect);
