import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersExamTestList} from "../../../../stores/admin/testList/storeAdminFiltersExamTestList";
import {FilterDropdownMultiSelect, FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminExamTestListStyle.scss";

function AdminTestListFilters(props: SmartComponentProps<StoreAdminFiltersExamTestList>) {
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
                    store={props.store.storeFilterPosition}
                />

                <FilterDropdownMultiSelect
                    store={props.store.storeFilterQuestionGroup}
                />
            </div>
        </FiltersContainer>
    );
}

export default React.memo(AdminTestListFilters);
