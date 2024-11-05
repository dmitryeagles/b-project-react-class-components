import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreStudentFiltersPageAttestationList
} from "../../../../stores/student/attestationList/storeStudentFiltersPageAttestationList";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./studentAttestationListFiltersStyle.scss";

function StudentAttestationListFilters(props: SmartComponentProps<StoreStudentFiltersPageAttestationList>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />
            <FilterDropdownMultiSelect
                store={props.store.storeFilterAttestations}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(StudentAttestationListFilters);
