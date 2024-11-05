import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportProjectLeanRegistrySmart} from "../../components/reports/reportProjectLeanRegistrySmart";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectLeanAdminRegistryInfo
} from "../../stores/admin/pageProjectLeanAdminRegistryInfo/storePageProjectLeanAdminRegistryInfo";

class PageCommonProjectLeanAdminRegistryInfo extends React.Component<PageComponentProps<StorePageProjectLeanAdminRegistryInfo>> {

    constructor(props: PageComponentProps<StorePageProjectLeanAdminRegistryInfo>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    render() {
        if (!this.props.storePage.storeContentPage){
            return null;
        }
        if (this.props.storePage.storeContentPage.errorWhileGettingData){
            return(
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }
        return (
            <PageContainer>
                <ReportProjectLeanRegistrySmart store={this.props.storePage.storeContentPage.storeReportProjectLeanRegistry}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonProjectLeanAdminRegistryInfo);
