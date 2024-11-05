import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectAdminMini5s
} from "../../../../stores/admin/projectAdminMini5s/storeFiltersProjectAdminMini5s";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "../../projectAdminMini5s/projectAdminMini5sFilters/projectAdminMini5sFiltersStyle.scss";

function ProjectAdminMini5sFilters(props: SmartComponentProps<StoreFiltersProjectAdminMini5s>) {
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
                        store={props.store.storeFilterFactory}
                    />
                    <FilterDropdownSelect
                        store={props.store.storeSortType}
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

export default observer(ProjectAdminMini5sFilters);
