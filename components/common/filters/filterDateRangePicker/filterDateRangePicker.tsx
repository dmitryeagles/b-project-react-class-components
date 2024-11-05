import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreFilterDateRangePicker} from "../../../../stores/filters/storeFilterDateRangePicker";
import {DateRangePicker} from "../../dateRangePicker";

interface FilterDateRangePickerProps extends SmartComponentProps<StoreFilterDateRangePicker>{
    classNameInputDateWrapper?: string;
}

function FilterDateRangePicker(props: FilterDateRangePickerProps){
    return(
        <DateRangePicker
            eventChangeDateEnd={props.store.eventChangeDateEnd}
            eventChangeDateStart={props.store.eventChangeDateStart}
            selectedDateEnd={props.store.dateRange.dateEnd}
            selectedDateStart={props.store.dateRange.dateStart}
            placeholderTextStart={props.store.placeholderText?.dateStart}
            placeholderTextEnd={props.store.placeholderText?.dateEnd}
            isClearable={props.store.isClearable}
            classNameInputDateWrapper={props.classNameInputDateWrapper}
        />
    );
}

export default observer(FilterDateRangePicker)
