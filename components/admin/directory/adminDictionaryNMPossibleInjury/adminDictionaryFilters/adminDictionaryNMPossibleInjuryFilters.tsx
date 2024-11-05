import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionaryNMPossibleInjury
} from "../../../../../stores/admin/NMPossibleInjury/storeAdminFiltersDictionaryNMPossibleInjury";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryNMPossibleInjuryFiltersStyle.scss";

function AdminDictionaryNMPossibleInjuryFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryNMPossibleInjury>) {
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

export default React.memo(AdminDictionaryNMPossibleInjuryFilters);
