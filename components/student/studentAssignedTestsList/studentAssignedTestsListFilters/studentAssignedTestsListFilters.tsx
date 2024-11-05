import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreStudentFiltersPageAssignedList
} from "../../../../stores/student/assignedTests/storeStudentFiltersPageeAssignedList";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./studentAssignedTestsListFiltersStyle.scss";

function StudentAssignedTestsListFilters(props: SmartComponentProps<StoreStudentFiltersPageAssignedList>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
            <FilterDropdownSelect
                store={props.store.storeTestStatus}
            />
            <FilterDropdownMultiSelect
                store={props.store.storeFilterTests}
            />
        </FiltersContainer>
    );
}

export default React.memo(StudentAssignedTestsListFilters);
