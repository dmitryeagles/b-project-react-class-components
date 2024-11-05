import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreFilterDropdownSelect} from "../../../../stores/filters/storeFilterDropdownSelect";
import {DropdownSelect} from "../../dropdownSelect";

interface FilterDropdownSelectProps extends SmartComponentProps<StoreFilterDropdownSelect<any>> {
    className?: string;
}

function FilterDropdownSelect(props: FilterDropdownSelectProps){
    return(
        <DropdownSelect
            className={props.className}
            placeholder={props.store.placeholder}
            eventChange={props.store.eventChangeValue}
            optionsList={props.store.optionsList}
            selectedValue={props.store.selectedValues}
            isClearable={true}
            isSearchable={true}
        />
    );
}

export default observer(FilterDropdownSelect);
