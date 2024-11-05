import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreFiltersProjectResourceManagerLEAN
} from "../../../../stores/resourceApprovingManager/projectResourceApprovingManagerLEAN/storeFiltersProjectResourceManagerLEAN";
import {FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles
    from "../../projectLeanResourceManager/projectLeanResourceManagerFilters/projectLeanResourceManagerFiltersStyle.scss";

function ProjectLeanResourceManagerFilters(props: SmartComponentProps<StoreFiltersProjectResourceManagerLEAN>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeFilterStages}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(ProjectLeanResourceManagerFilters);
