import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionarySevObservationType
} from "../../../../../stores/admin/SevObservationType/storeAdminFiltersDictionarySevObservationType";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionarySevObservationTypeFiltersStyle.scss";

function AdminDictionarySevObservationTypeFilters(props: SmartComponentProps<StoreAdminFiltersDictionarySevObservationType>) {
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

export default React.memo(AdminDictionarySevObservationTypeFilters);
