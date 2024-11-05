import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionarySEVBehaviorType
} from "../../../../../stores/admin/SEVBehaviorType/storeAdminFiltersDictionarySEVBehaviorType";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionarySEVBehaviorTypeFiltersStyle.scss";

function AdminDictionarySEVBehaviorTypeFilters(props: SmartComponentProps<StoreAdminFiltersDictionarySEVBehaviorType>) {
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

export default React.memo(AdminDictionarySEVBehaviorTypeFilters);
