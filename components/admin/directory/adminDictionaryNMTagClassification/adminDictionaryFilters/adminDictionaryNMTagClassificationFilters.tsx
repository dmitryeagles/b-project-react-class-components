import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionaryNMTagClassification
} from "../../../../../stores/admin/NMTagClassification/storeAdminFiltersDictionaryNMTagClassification";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryNMTagClassificationFiltersStyle.scss";

function AdminDictionaryNMTagClassificationFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryNMTagClassification>) {
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

export default React.memo(AdminDictionaryNMTagClassificationFilters);
