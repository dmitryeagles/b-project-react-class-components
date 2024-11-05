import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreShiftManagerFiltersEmployeeEvaluation
} from "../../../../stores/shiftManager/employeeEvaluation/storeShiftManagerFiltersEmployeeEvaluation";
import {FilterDropdownMultiSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";

function ShiftManagerEmployeeEvaluationFilters(props: SmartComponentProps<StoreShiftManagerFiltersEmployeeEvaluation>) {
    return (
        <FiltersContainer>
            <FilterDropdownMultiSelect
                store={props.store.storeFilterUser}
            />
        </FiltersContainer>
    );
}

export default React.memo(ShiftManagerEmployeeEvaluationFilters);
