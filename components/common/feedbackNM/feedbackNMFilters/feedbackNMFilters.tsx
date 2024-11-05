import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCommonFiltersFeedbackNM} from "../../../../stores/common/pageFeedbackNM/storeCommonFiltersFeedbackNM";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./feedbackNMFiltersStyle.scss";

function FeedbackNMFilters(props: SmartComponentProps<StoreCommonFiltersFeedbackNM>) {
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
                {
                    props.store.selectedIdToSearch ?
                        <FilterItemById
                            itemId={props.store.selectedIdToSearch.value}
                            eventResetSearch={props.store.eventResetSelectedIdToSearch}
                        /> : null
                }
            </div>
        </FiltersContainer>
    );
}

export default observer(FeedbackNMFilters);
