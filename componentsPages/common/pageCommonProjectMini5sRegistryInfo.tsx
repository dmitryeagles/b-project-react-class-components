import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportProjectMini5sRegistrySmart} from "../../components/reports/reportProjectMini5sRegistrySmart";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectMini5sRegistryInfo
} from "../../stores/common/pageProjectMini5sRegistryInfo/storePageProjectMini5sRegistryInfo";

class PageCommonProjectMini5sRegistryInfo extends React.Component<PageComponentProps<StorePageProjectMini5sRegistryInfo>> {

    constructor(props: PageComponentProps<StorePageProjectMini5sRegistryInfo>) {
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
                <ReportProjectMini5sRegistrySmart store={this.props.storePage.storeContentPage.storeReportProjectMini5sRegistry}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonProjectMini5sRegistryInfo);
