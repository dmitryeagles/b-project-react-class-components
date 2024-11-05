import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersUsers} from "../../../../stores/admin/users/storeAdminFiltersUsers";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminUsersFiltersStyle.scss";

function AdminUsersFilters(props: SmartComponentProps<StoreAdminFiltersUsers>) {
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

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterSystemRoles}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterHead}
                />

                <FilterDropdownSelect
                    store={props.store.storeFilterFactory}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterPosition}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterUnit}
                />
            </div>
        </FiltersContainer>
    );
}

export default React.memo(AdminUsersFilters);
