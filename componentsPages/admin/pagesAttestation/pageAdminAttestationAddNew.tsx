import {observer} from "mobx-react";
import React from "react";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageAttestation} from "../../../stores/admin/attestation/storeAdminPageAttestation";
import PageContentAdminAttestationAddNew from "./pageContentAdminAttestationAddNew";

function PageAdminAttestationAddNew(props: PageComponentProps<StoreAdminPageAttestation>) {
    if (!props.storePage.storeContentPage) {
        return null;
    }

    return (
        <PageContentAdminAttestationAddNew
            store={props.storePage.storeContentPage}
        />
    );
}

export default observer(PageAdminAttestationAddNew);
