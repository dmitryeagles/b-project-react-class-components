import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersCreateNews} from "../../../../stores/admin/createNews/storeAdminFiltersCreateNews";
import {FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminCreateNewsFilterStyle.scss";

function AdminCreateNewsFilter(props: SmartComponentProps<StoreAdminFiltersCreateNews>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeFilterNewsActive}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default observer(AdminCreateNewsFilter);
