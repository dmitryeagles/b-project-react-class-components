import {observer} from "mobx-react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StorePageGuestAllNewsFilter} from "../../../../stores/guest/allNews/storePageGuestAllNewsFilter";
import {FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./guestAllNewsFiltersStyle.scss";

function GuestAllNewsFilters(props: SmartComponentProps<StorePageGuestAllNewsFilter>) {
    return (
        <FiltersContainer>
            <div className={styles.containerGreed}>
                <div className={styles.inputSearchContainer}>
                    <div className={styles.filterDropDownGroupContainer}>
                        <FilterDropdownSelect
                            store={props.store.storeSortType}
                        />
                        <div className={styles.filterSearchWrapper}>
                            <InputSearch
                                store={props.store.storeFilterInputSearch}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FiltersContainer>
    );
}

export default observer(GuestAllNewsFilters);
