import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonFiltersUserDevelopmentPlan
} from "../../../../stores/common/pageUserDevelopmentPlan/storeCommonFiltersUserDevelopmentPlan";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./userDevelopmentPlanFiltersStyle.scss";

function UserDevelopmentPlanFilters(props: SmartComponentProps<StoreCommonFiltersUserDevelopmentPlan>) {
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
                    <FilterDropdownMultiSelect
                        store={props.store.storeFilterYears}
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

export default observer(UserDevelopmentPlanFilters);
