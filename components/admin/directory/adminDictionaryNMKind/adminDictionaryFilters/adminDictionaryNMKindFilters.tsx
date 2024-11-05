import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersDictionaryNMKind} from "../../../../../stores/admin/NMKind/storeAdminFiltersDictionaryNMKind";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryNMKindFiltersStyle.scss";

function AdminDictionaryNMKindFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryNMKind>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterFactory}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterRole}
            />

            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(AdminDictionaryNMKindFilters);
