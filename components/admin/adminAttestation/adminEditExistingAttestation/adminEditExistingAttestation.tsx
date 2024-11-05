import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditAttestation} from "../../../../stores/admin/attestation/storeAdminEditAttestation";
import {AdminAttestationCategorySeparator} from "../adminAttestationCategorySeparator";
import {AdminAttestationLevelsList} from "../adminAttestationLevelsList";
import {AdminAttestationPopupsEditors} from "../adminAttestationPopupsEditors";
import {AdminAttestationPositionKPIListList} from "../adminAttestationPositionKPIList";
import {AdminAttestationUserKPIList} from "../adminAttestationUserKPIList";

function AdminEditExistingAttestation(props: SmartComponentProps<StoreAdminEditAttestation>) {
    return (
        <>
            {
                props.store.storeAttestationMainInfo.attestationMainInfo.isDefineLevelByTest ? null :
                    <>
                        <AdminAttestationCategorySeparator
                            title={'Уровни'}
                            eventClick={props.store.eventStartAddNewAttestationLevel}
                        />
                        <AdminAttestationLevelsList store={props.store}/>
                    </>
            }
            <AdminAttestationCategorySeparator
                title={'KPI должностей'}
                eventClick={props.store.eventStartAddNewAttestationPositionKPI}
            />
            <AdminAttestationPositionKPIListList store={props.store}/>
            <AdminAttestationPopupsEditors store={props.store}/>

            <AdminAttestationCategorySeparator
                title={'KPI сотрудника'}
                eventClick={props.store.eventStartAddNewAttestationUserKPI}
            />
            <AdminAttestationUserKPIList store={props.store}/>
        </>
    );
}

export default React.memo(AdminEditExistingAttestation);

