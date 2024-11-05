import {observer} from "mobx-react";
import React from "react";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageAttestation} from "../../../stores/admin/attestation/storeAdminPageAttestation";
import PageContentAdminAttestationEdit from "./pageContentAdminAttestationEdit";

function PageAdminAttestationEdit(props: PageComponentProps<StoreAdminPageAttestation>) {

    if (!props.storePage.storeContentPage) {
        return null;
    }

    return (
        <PageContentAdminAttestationEdit
            store={props.storePage.storeContentPage}
        />
    );
}

export default observer(PageAdminAttestationEdit);
