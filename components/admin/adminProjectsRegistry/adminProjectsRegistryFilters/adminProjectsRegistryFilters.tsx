import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectsAdminRegistry
} from "../../../../stores/admin/projectsAdminRegistry/storeFiltersProjectsAdminRegistry";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminProjectsRegistryFiltersStyle.scss";

function AdminProjectsRegistryFilters(props: SmartComponentProps<StoreFiltersProjectsAdminRegistry>) {
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
                <FilterDropdownMultiSelect
                    store={props.store.storeFilterFactory}
                />
                <FilterDropdownSelect
                    store={props.store.storeFilterStages}
                />
                <FilterDropdownSelect
                    store={props.store.storeFilterProjectType}
                />
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

export default observer(AdminProjectsRegistryFilters);
