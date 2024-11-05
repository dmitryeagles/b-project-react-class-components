import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersEmployeeEvaluation
} from "../../../../stores/admin/employeeEvaluation/storeAdminFiltersEmployeeEvaluation";
import {FilterDropdownMultiSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";

function AdminEmployeeEvaluationFilters(props: SmartComponentProps<StoreAdminFiltersEmployeeEvaluation>) {
    return (
        <FiltersContainer>
            <FilterDropdownMultiSelect
                store={props.store.storeFilterUser}
            />
        </FiltersContainer>
    );
}

export default React.memo(AdminEmployeeEvaluationFilters);
