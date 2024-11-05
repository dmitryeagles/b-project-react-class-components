import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectAdminResourceAlignment
} from "../../../../stores/admin/projectAdminResourceAlignment/storeFiltersProjectAdminResourceAlignment";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminProjectResourceAlignmentFiltersStyle.scss";

function AdminProjectResourceAlignmentFilters(props: SmartComponentProps<StoreFiltersProjectAdminResourceAlignment>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownMultiSelect
                store={props.store.storeFilterFactory}
            />
            <FilterDropdownSelect
                store={props.store.storeFilterStages}
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

export default observer(AdminProjectResourceAlignmentFilters);
