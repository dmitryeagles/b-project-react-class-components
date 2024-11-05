import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersAttestationNewEmployee
} from "../../../../stores/admin/attestationNewEmployee/storeAdminFiltersAttestationNewEmployee";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminAttestationNewEmployeesFiltersStyle.scss";

function AdminAttestationNewEmployeesFilters(props: SmartComponentProps<StoreAdminFiltersAttestationNewEmployee>) {
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
                <FilterDropdownMultiSelect
                    store={props.store.storeFilterUser}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterTest}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterUnit}
                />

                <FilterDropdownSelect
                    store={props.store.storeFilterFactory}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterPosition}
                />
            </div>
        </FiltersContainer>
    );
}

export default React.memo(AdminAttestationNewEmployeesFilters);
