import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionarySevRiskDegreeCatalog
} from "../../../../../stores/admin/SevRiskDegreeCatalog/storeAdminFiltersDictionarySevRiskDegreeCatalog";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionarySevRiskDegreeCatalogFiltersStyle.scss";

function AdminDictionarySevRiskDegreeCatalogFilters(props: SmartComponentProps<StoreAdminFiltersDictionarySevRiskDegreeCatalog>) {
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

export default React.memo(AdminDictionarySevRiskDegreeCatalogFilters);
