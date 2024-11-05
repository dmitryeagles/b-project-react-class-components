import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {StoreAdminDictionaryKPIFilters} from "../../../../../stores/admin/KPI/storeAdminDictionaryKPIFilters";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryKPIFiltersStyle.scss";

function AdminDictionaryKPIFilters(props: SmartComponentProps<StoreAdminDictionaryKPIFilters>) {
    return (
        <FiltersContainer>
            <div className={styles.inputSearchContainer}>
                <div className={styles.filterSearchWrapper}>
                    <InputSearch
                        store={props.store.storeFilterInputSearch}
                    />
                </div>
            </div>

            <div className={styles.filterDropDownGroupContainer}>
                <FilterDropdownSelect
                    store={props.store.storeSortType}
                />

                <FilterDropdownSelect
                    store={props.store.storeFilterFactory}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterCategoryKPI}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterComparisonMethod}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterJobTitle}
                />
            </div>
        </FiltersContainer>
    );
}

export default observer(AdminDictionaryKPIFilters);
