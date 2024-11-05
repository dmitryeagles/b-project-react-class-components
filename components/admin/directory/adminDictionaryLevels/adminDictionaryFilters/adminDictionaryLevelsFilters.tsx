import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersDictionaryLevel} from "../../../../../stores/admin/levels/storeAdminFiltersDictionaryLevel";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryLevelsFiltersStyle.scss";

function AdminDictionaryJobTitleFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryLevel>) {
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

export default React.memo(AdminDictionaryJobTitleFilters);
