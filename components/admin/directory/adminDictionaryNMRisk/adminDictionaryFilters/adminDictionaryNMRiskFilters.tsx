import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersDictionaryNMRisk} from "../../../../../stores/admin/NMRisk/storeAdminFiltersDictionaryNMRisk";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryNMRiskFiltersStyle.scss";

function AdminDictionaryNMRiskFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryNMRisk>) {
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

export default React.memo(AdminDictionaryNMRiskFilters);
