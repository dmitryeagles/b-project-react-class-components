import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionaryFactory
} from "../../../../../stores/admin/factory/storeAdminFiltersDictionaryFactory";
import {FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryFactoryFiltersStyle.scss";

function AdminDictionaryFactoryFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryFactory>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(AdminDictionaryFactoryFilters);
