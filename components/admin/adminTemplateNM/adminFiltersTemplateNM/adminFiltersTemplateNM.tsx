import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersTemplateNM} from "../../../../stores/admin/templateNM/storeAdminFiltersTemplateNM";
import {FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminFiltersTemplateNMStyle.scss";

function AdminFiltersTemplateNM(props: SmartComponentProps<StoreAdminFiltersTemplateNM>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />
            <FilterDropdownSelect
                store={props.store.storeFilterFactory}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(AdminFiltersTemplateNM);
