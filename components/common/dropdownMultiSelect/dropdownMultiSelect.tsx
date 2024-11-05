import React from "react";
import Select from 'react-select'
import {dropdownSelectCloseMenuOnScroll} from "../dropdownSelect/closeMenuOnScroll";
import DropdownNoOptionsMessage from "../dropdownSelect/dropdownNoOptionsMessage";
import {DropdownSelectItem} from "../dropdownSelect/dropdownSelect";
import styleConfig from "../dropdownSelect/dropdownStyleConfig";
import themeConfig from "../dropdownSelect/dropdownThemeConfig";

export type DropdownMultiSelectItems<ValueType = number> = readonly DropdownSelectItem<ValueType>[];
export type DropdownMultiSelectSelectedValue<ValueType = number> = readonly DropdownSelectItem<ValueType>[];

function indicatorSeparator() {
    return null;
}

interface EditorSelectProps<ValueType = number> {
    className?: string;
    optionsList: DropdownSelectItem<ValueType>[];
    placeholder?: string;
    isClearable?: boolean;
    isCloseMenuOnSelect?: boolean;
    selectedValues?: DropdownMultiSelectSelectedValue<ValueType>;
    eventChange: (value: any) => void; // Тут TypeScript не может контекстуально определить тип, поэтому any
    eventFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    maxLimit?: number;
}

/**
 * Выпадающий список с множественным выбором
 * @param props
 * @constructor
 */
function DropdownMultiSelect<ValueType = number>(props: EditorSelectProps<ValueType>) {
    const selectedValues = props.selectedValues;
    const maxLimit = props.maxLimit;

    return (
        <Select
            isClearable={props.isClearable}
            isSearchable
            isMulti
            closeMenuOnSelect={!!props.isCloseMenuOnSelect}
            closeMenuOnScroll={dropdownSelectCloseMenuOnScroll}
            placeholder={props.placeholder ?? 'Поиск...'}
            noOptionsMessage={DropdownNoOptionsMessage}
            className={props.className}
            options={props.optionsList}
            value={selectedValues}
            onChange={props.eventChange}
            onFocus={props.eventFocus}
            menuPlacement={'auto'}
            menuPosition={'fixed'}
            theme={themeConfig}
            styles={styleConfig}
            components={{
                IndicatorSeparator: indicatorSeparator,
            }}
            isOptionDisabled={maxLimit && selectedValues ? () => selectedValues.length >= maxLimit : undefined}
        />
    );
}

export default React.memo(DropdownMultiSelect);
