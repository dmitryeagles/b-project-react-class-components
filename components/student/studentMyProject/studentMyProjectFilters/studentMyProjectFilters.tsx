import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCommonFiltersSendProject} from "../../../../stores/common/pageSendProject/storeCommonFiltersSendProject";
import {FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./studentMyProjectFiltersStyle.scss";

function StudentMyProjectFilters(props: SmartComponentProps<StoreCommonFiltersSendProject>) {
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

export default observer(StudentMyProjectFilters);
