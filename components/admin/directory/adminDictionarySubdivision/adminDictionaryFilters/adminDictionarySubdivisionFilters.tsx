import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionarySubdivision
} from "../../../../../stores/admin/subdivision/storeAdminFiltersDictionarySubdivision";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionarySubdivisionFiltersStyle.scss";

function AdminDictionarySubdivisionFilters(props: SmartComponentProps<StoreAdminFiltersDictionarySubdivision>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterFactory}
            />

            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(AdminDictionarySubdivisionFilters);
