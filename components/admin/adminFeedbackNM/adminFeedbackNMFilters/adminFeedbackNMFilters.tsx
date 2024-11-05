import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersFeedbackNM} from "../../../../stores/admin/feedbackNM/storeAdminFiltersFeedbackNM";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from './adminFeedbackNMFiltersStyle.scss';

function AdminFeedbackNMFilters(props: SmartComponentProps<StoreAdminFiltersFeedbackNM>) {

    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />

            <InputSearch
                store={props.store.storeFilterInputSearch}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterFactory}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeStatusType}
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

export default observer(AdminFeedbackNMFilters);
