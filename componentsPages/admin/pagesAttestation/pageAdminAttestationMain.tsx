import {observer} from "mobx-react";
import React from "react";
import {PageComponentProps} from "../../../interfaces/pageComponentProps";
import {StoreAdminPageAttestation} from "../../../stores/admin/attestation/storeAdminPageAttestation";
import PageContentAdminAttestationMain from "./pageContentAdminAttestationMain";

function PageAdminAttestationMain(props: PageComponentProps<StoreAdminPageAttestation>) {

    if (!props.storePage.storeContentPage) {
        return null;
    }

    return (
       <PageContentAdminAttestationMain store={props.storePage.storeContentPage}/>
    );
}

export default observer(PageAdminAttestationMain);
