import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersFeedbackSEV} from "../../../../stores/admin/feedbackSEV/storeAdminFiltersFeedbackSEV";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminFeedbackSEVFiltersStyle.scss";

function AdminFeedbackSEVFilters(props: SmartComponentProps<StoreAdminFiltersFeedbackSEV>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterFactory}
            />
            <FilterDropdownMultiSelect
                store={props.store.storeStatusType}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
            {
                props.store.selectedIdToSearch ?
                    <FilterItemById
                        itemId={props.store.selectedIdToSearch.value}
                        eventResetSearch={props.store.eventResetSelectedIdToSearch}
                    /> : null
            }
        </FiltersContainer>
    );
}

export default observer(AdminFeedbackSEVFilters);
