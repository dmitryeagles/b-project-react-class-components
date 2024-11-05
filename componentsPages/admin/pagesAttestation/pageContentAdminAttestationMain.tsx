import {observer} from "mobx-react";
import React from "react";
import {AdminAttestationActionButtons} from "../../../components/admin/adminAttestation";
import {AdminAttestationItemsList} from "../../../components/admin/adminAttestation/adminAttestationItemsList";
import AdminFiltersAttestation
    from "../../../components/admin/adminAttestation/adminFiltersAttestation/adminFiltersAttestation";
import {FormatViewItems} from "../../../components/common/formatViewItems";
import Paginate from "../../../components/common/paginate/paginate";
import {StubDataLoading} from "../../../components/common/stubDataLoading";
import {StubErrorGetData} from "../../../components/common/stubErrorGetData";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreAdminPageContentAttestation} from "../../../stores/admin/attestation/storeAdminPageContentAttestation";

class PageContentAdminAttestationMain extends React.PureComponent<SmartComponentProps<StoreAdminPageContentAttestation>> {

    constructor(props: SmartComponentProps<StoreAdminPageContentAttestation>) {
        super(props);
    }

    public componentDidMount() {
        this.props.store.eventShowPageAttestationsList();
    }

    render() {

        if (!this.props.store.storeDataFromServerReceived.status) {
            return (<StubDataLoading loadingDataText={'Идет загрузка аттестации...'}/>);
        }

        if (this.props.store.storeErrorWhileGettingData.errorText) {
            return (<StubErrorGetData errorText={this.props.store.storeErrorWhileGettingData.errorText}/>);
        }

        return (
            <>
                <AdminAttestationActionButtons
                    linkAddNewAttestation={this.props.store.linkAddNewItem}
                />
                <AdminFiltersAttestation store={this.props.store.storeFilters}/>
                <FormatViewItems store={this.props.store.storeSelectViewCatalog}/>
                <AdminAttestationItemsList store={this.props.store}/>
                <Paginate store={this.props.store.storeDataPagination}/>
            </>
        );
    }
}

export default observer(PageContentAdminAttestationMain);
