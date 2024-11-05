import {observer} from "mobx-react";
import React from "react";
import {
    AdminAttestationEditorMainInfo
} from "../../../components/admin/adminAttestation/adminAttestationEditorMainInfo";
import {
    AdminAttestationWaitWriteMainInfo
} from "../../../components/admin/adminAttestation/adminAttestationWaitWriteMainInfo/insex";
import {AdminEditExistingAttestation} from "../../../components/admin/adminAttestation/adminEditExistingAttestation";
import {StubDataLoading} from "../../../components/common/stubDataLoading";
import {StubErrorGetData} from "../../../components/common/stubErrorGetData";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreAdminPageContentAttestation} from "../../../stores/admin/attestation/storeAdminPageContentAttestation";


class PageContentAdminAttestationAddNew extends React.PureComponent<SmartComponentProps<StoreAdminPageContentAttestation>> {

    constructor(props: SmartComponentProps<StoreAdminPageContentAttestation>) {
        super(props);
    }

    public componentDidMount() {
        this.props.store.eventShowPageAddNewAttestation();
    }

    public componentWillUnmount() {
        if (this.props.store.storeEditorAttestation) {
            this.props.store.storeEditorAttestation.eventLeavingEditPage();
        }

        this.props.store.eventExitPageEditor();
    }

    render() {

        if (!this.props.store.storeDataFromServerReceived.status) {
            return (
                <StubDataLoading loadingDataText={'Идет загрузка аттестации...'}/>
            );
        }

        if (this.props.store.storeErrorWhileGettingData.errorText) {
            return (
                <StubErrorGetData
                    errorText={this.props.store.storeErrorWhileGettingData.errorText}/>
            );
        }

        if (!this.props.store.storeEditorAttestation) {
            return null;
        }

        return (
            <div>
                <AdminAttestationEditorMainInfo
                    store={this.props.store.storeEditorAttestation}
                />

                {
                    this.props.store.storeEditorAttestation.storeIsSavedDataOnServer.status ?
                        <AdminAttestationWaitWriteMainInfo/> : <AdminEditExistingAttestation store={this.props.store.storeEditorAttestation}/>
                }
            </div>
        );
    }
}

export default observer(PageContentAdminAttestationAddNew);
