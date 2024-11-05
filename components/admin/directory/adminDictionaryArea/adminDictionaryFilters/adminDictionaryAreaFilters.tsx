import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersDictionaryArea} from "../../../../../stores/admin/area/storeAdminFiltersDictionaryArea";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryAreaFiltersStyle.scss";

function AdminDictionaryAreaFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryArea>) {
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

export default React.memo(AdminDictionaryAreaFilters);
