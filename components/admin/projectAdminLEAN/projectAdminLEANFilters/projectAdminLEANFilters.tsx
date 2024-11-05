import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreFiltersProjectAdminLEAN} from "../../../../stores/admin/projectAdminLEAN/storeFiltersProjectAdminLEAN";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "../../projectAdminLEAN/projectAdminLEANFilters/projectAdminLEANFiltersStyle.scss";

function ProjectAdminLEANFilters(props: SmartComponentProps<StoreFiltersProjectAdminLEAN>) {
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
                        store={props.store.storeFilterStages}
                    />
                    <FilterDropdownMultiSelect
                        store={props.store.storeFilterFactory}
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

export default observer(ProjectAdminLEANFilters);
