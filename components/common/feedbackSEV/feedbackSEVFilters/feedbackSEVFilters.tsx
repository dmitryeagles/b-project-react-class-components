import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCommonFiltersFeedbackSEV} from "../../../../stores/common/pageFeedbackSEV/storeCommonFiltersFeedbackSEV";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./feedbackSEVFiltersStyle.scss";

function FeedbackSEVFilters(props: SmartComponentProps<StoreCommonFiltersFeedbackSEV>) {
    return (
        <FiltersContainer>
            <div className={styles.containerGreed}>
                <div className={styles.inputSearchContainer}>
                    <div className={styles.filterSearchWrapper}>
                        <InputSearch
                            store={props.store.storeFilterInputSearch}
                        />
                    </div>
                </div>
                <div className={styles.filterDropDownGroupContainer}>
                    <FilterDropdownMultiSelect
                        store={props.store.storeFilterStatus}
                    />
                    <FilterDropdownSelect
                        store={props.store.storeSortType}
                    />
                </div>
            </div>
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

export default observer(FeedbackSEVFilters);
