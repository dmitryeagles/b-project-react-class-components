import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditAttestation} from "../../../../stores/admin/attestation/storeAdminEditAttestation";
import {AdminAttestationPopupEditorLevel} from "../adminAttestationPopupEditorLevel";
import {AdminAttestationPopupEditorPositionKPI} from "../adminAttestationPopupEditorPositionKPI";
import {AdminAttestationPopupEditorUserKPI} from "../adminAttestationPopupEditorUserKPI";

function AdminAttestationPopupsEditors(props: SmartComponentProps<StoreAdminEditAttestation>) {

    if (props.store.storeAdminPopupEditAttestation.storePopupEditorLevels) {
        return (
            <AdminAttestationPopupEditorLevel
                store={props.store.storeAdminPopupEditAttestation.storePopupEditorLevels}/>
        );
    }

    if (props.store.storeAdminPopupEditAttestation.storeAttestationPositionKPI) {
        return (
            <AdminAttestationPopupEditorPositionKPI
                store={props.store.storeAdminPopupEditAttestation.storeAttestationPositionKPI}/>
        );
    }

    if (props.store.storeAdminPopupEditAttestation.storeAttestationUserKPI) {
        return (
            <AdminAttestationPopupEditorUserKPI
                store={props.store.storeAdminPopupEditAttestation.storeAttestationUserKPI}/>
        );
    }

    return null;
}

export default observer(AdminAttestationPopupsEditors);
