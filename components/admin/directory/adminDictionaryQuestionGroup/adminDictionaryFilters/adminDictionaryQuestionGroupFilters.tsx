import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminFiltersDictionaryQuestionGroup
} from "../../../../../stores/admin/questionGroup/storeAdminFiltersDictionaryQuestionGroup";
import {FilterDropdownSelect} from "../../../../common/filters";
import {FiltersContainer} from "../../../../common/filters/filtersContainer";
import {InputSearch} from "../../../../common/inputSearch";
import styles from "./adminDictionaryQuestionGroupFiltersStyle.scss";


function AdminDictionaryQuestionGroupFilters(props: SmartComponentProps<StoreAdminFiltersDictionaryQuestionGroup>) {
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

export default React.memo(AdminDictionaryQuestionGroupFilters);
