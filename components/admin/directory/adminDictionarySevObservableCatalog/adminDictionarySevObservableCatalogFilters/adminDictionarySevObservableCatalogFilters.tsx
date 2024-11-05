import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionarySevObservableCatalog
} from "../../../../../stores/admin/SevObservableCatalog/storeAdminFiltersDictionarySevObservableCatalog";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionarySevObservableCatalogFiltersStyle.scss";

function AdminDictionarySevObservableCatalogFilters(props: SmartComponentProps<StoreAdminFiltersDictionarySevObservableCatalog>) {
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

export default React.memo(AdminDictionarySevObservableCatalogFilters);
