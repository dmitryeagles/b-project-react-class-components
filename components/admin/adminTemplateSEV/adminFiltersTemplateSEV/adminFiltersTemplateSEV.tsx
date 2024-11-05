import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersTemplateSEV} from "../../../../stores/admin/templateSEV/storeAdminFiltersTemplateSEV";
import {FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminFiltersTemplateSEVStyle.scss";

function AdminFiltersTemplateSEV(props: SmartComponentProps<StoreAdminFiltersTemplateSEV>) {
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

export default React.memo(AdminFiltersTemplateSEV);
