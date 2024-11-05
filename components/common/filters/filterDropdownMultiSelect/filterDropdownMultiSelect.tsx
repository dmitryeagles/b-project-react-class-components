import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreFilterDropdownMultiSelect} from "../../../../stores/filters/storeFilterDropdownMultiSelect";
import DropdownMultiSelect from "../../dropdownMultiSelect/dropdownMultiSelect";


interface FilterDropdownMultiSelectProps extends SmartComponentProps<StoreFilterDropdownMultiSelect<number> | StoreFilterDropdownMultiSelect<string>> {
    className?: string;
}

function FilterDropdownMultiSelect(props: FilterDropdownMultiSelectProps){
    return(
        <DropdownMultiSelect
            className={props.className}
            placeholder={props.store.placeholder}
            eventChange={props.store.eventChangeValue}
            optionsList={props.store.optionsList}
            selectedValues={props.store.selectedValues}
        />
    );
}

export default observer(FilterDropdownMultiSelect);
