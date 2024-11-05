import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminFiltersAttestation} from "../../../../stores/admin/attestation/storeAdminFiltersAttestation";
import {FilterDropdownSelect} from "../../../common/filters";
import {FiltersContainer} from "../../../common/filters/filtersContainer";
import {InputSearch} from "../../../common/inputSearch";
import styles from "./adminFiltersAttestationStyle.scss";

function AdminFiltersAttestation(props: SmartComponentProps<StoreAdminFiltersAttestation>) {
    return (
        <FiltersContainer className={styles.filtersContainer}>
            <FilterDropdownSelect
                store={props.store.storeSortType}
            />
            <FilterDropdownSelect
                store={props.store.storeFilterFactory}
            />
            <InputSearch
                store={props.store.storeFilterInputSearch}
            />
        </FiltersContainer>
    );
}

export default React.memo(AdminFiltersAttestation);
