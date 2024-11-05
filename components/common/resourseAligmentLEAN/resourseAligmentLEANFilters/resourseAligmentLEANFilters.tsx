import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectResourceAlignmentLEAN
} from "../../../../stores/common/pageResourceAlignmentLEAN/storeFiltersProjectResourceAlignmentLEAN";
import {FilterDropdownSelect, FilterItemById} from "../../filters";
import {FiltersContainer} from "../../filters/filtersContainer";
import {InputSearch} from "../../inputSearch";
import styles from "./resourseAligmentLEANFiltersStyle.scss";

function ResourseAligmentLEANFilters(props: SmartComponentProps<StoreFiltersProjectResourceAlignmentLEAN>) {
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

export default observer(ResourseAligmentLEANFilters);
