import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCommonFiltersProjectVote} from "../../../../stores/common/pageProjecVote/storeCommonFiltersProjectVote";
import {FilterDropdownMultiSelect, FilterDropdownSelect, FilterItemById} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./projectsForVotingFiltersStyle.scss";

function ProjectsForVotingFilters(props: SmartComponentProps<StoreCommonFiltersProjectVote>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownMultiSelect
                store={props.store.storeFilterParticipants}
            />

            <InputSearch
                store={props.store.storeFilterInputSearch}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterManager}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterAuthor}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterKpiProject}
            />

            <FilterDropdownMultiSelect
                store={props.store.storeFilterResourceManager}
            />

            <FilterDropdownSelect
                store={props.store.storeFilterVoteStatus}
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

export default observer(ProjectsForVotingFilters);
