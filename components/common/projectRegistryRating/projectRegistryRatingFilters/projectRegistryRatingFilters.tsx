import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectRegistryRating
} from "../../../../stores/common/pageProjectRegistryRating/storeFiltersProjectRegistryRating";
import {FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./projectRegistryRatingFiltersStyle.scss";

function ProjectRegistryRatingFilters(props: SmartComponentProps<StoreFiltersProjectRegistryRating>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortRating}
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

export default observer(ProjectRegistryRatingFilters);
