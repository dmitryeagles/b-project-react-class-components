import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonFiltersSendProjectLEAN
} from "../../../../stores/common/pageSendProjectLEAN/storeCommonFiltersSendProjectLEAN";
import {FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./studentMyProjectLEANFiltersStyle.scss";

function StudentMyProjectLEANFilters(props: SmartComponentProps<StoreCommonFiltersSendProjectLEAN>) {
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
                        store={props.store.storeFilterStages}
                    />
                    <FilterDropdownSelect
                        store={props.store.storeSortType}
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

export default observer(StudentMyProjectLEANFilters);
