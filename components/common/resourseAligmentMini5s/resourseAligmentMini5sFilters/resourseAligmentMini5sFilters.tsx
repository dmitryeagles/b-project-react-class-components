import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectResourceAlignmentMini5s
} from "../../../../stores/common/pageResourceAlignmentMini5s/storeFiltersProjectResourceAlignmentMini5s";
import {FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./resourseAligmentMini5sFiltersStyle.scss";

function ResourseAligmentMini5sFilters(props: SmartComponentProps<StoreFiltersProjectResourceAlignmentMini5s>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
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

export default observer(ResourseAligmentMini5sFilters);
