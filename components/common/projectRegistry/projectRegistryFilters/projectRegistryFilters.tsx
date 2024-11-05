import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreFiltersProjectRegistry} from "../../../../stores/common/pageProjectRegistry/storeFiltersProjectRegistry";
import {FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./projectRegistryFiltersStyle.scss";

function ProjectRegistryFilters(props: SmartComponentProps<StoreFiltersProjectRegistry>) {
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
                    <FilterDropdownSelect
                        store={props.store.storeSortType}
                    />
                    <FilterDropdownSelect
                        store={props.store.storeFilterProjectType}
                    />
                    <FilterDropdownSelect
                        store={props.store.storeFilterStages}
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

export default observer(ProjectRegistryFilters);
