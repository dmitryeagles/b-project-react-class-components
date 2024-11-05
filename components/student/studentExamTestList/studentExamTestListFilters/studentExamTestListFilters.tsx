import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreStudentFiltersExamTestList} from "../../../../stores/student/examTestList/storeStudentFiltersExamTestList";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./studentExamTestListFiltersStyle.scss";

function StudentExamTestListFilters(props: SmartComponentProps<StoreStudentFiltersExamTestList>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />
            <FilterDropdownMultiSelect
                store={props.store.storeFilterTests}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(StudentExamTestListFilters);
