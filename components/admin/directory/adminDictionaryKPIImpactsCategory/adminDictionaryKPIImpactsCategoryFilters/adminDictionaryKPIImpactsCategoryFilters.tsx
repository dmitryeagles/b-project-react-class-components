import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionaryKPIImpactsCategory
} from "../../../../../stores/admin/KPIImpactsCategory/storeAdminFiltersDictionaryKPIImpactsCategory";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryKPIImpactsCategoryFiltersStyle.scss";

function AdminDictionaryKPIImpactsCategoryFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryKPIImpactsCategory>) {
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

export default React.memo(AdminDictionaryKPIImpactsCategoryFilters);
