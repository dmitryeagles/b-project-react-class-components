import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersQuestionsBank} from "../../../../stores/admin/questionBank/storeAdminFiltersQuestionsBank";
import {FilterDropdownMultiSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminQuestionBankFiltersStyle.scss";

function AdminQuestionBankFilters(props: SmartComponentProps<StoreAdminFiltersQuestionsBank>) {
    return (
        <FiltersContainer>
            <div className={styles.filterDropDownGroupContainer}>
                <FilterDropdownMultiSelect
                    store={props.store.storeFilterQuestionGroup}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterFactory}
                />

                <InputSearch
                    store={props.store.storeFilterInputSearch}
                />
            </div>
        </FiltersContainer>
    );
}

export default React.memo(AdminQuestionBankFilters);
