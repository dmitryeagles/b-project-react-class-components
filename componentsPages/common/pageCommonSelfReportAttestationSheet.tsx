import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import ReportAttestationSheetSmart from "../../components/reports/reportAttestationSheet/reportAttestationSheetSmart";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreCommonPageSelfReportAttestationSheet
} from "../../stores/common/pageSelfReportAttestationSheet/storeCommonPageSelfReportAttestationSheet";


class PageCommonSelfReportAttestationSheet extends React.Component<PageComponentProps<StoreCommonPageSelfReportAttestationSheet>> {

    constructor(props: PageComponentProps<StoreCommonPageSelfReportAttestationSheet>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    render() {
        if (!this.props.storePage.storeContentPage) {
            return null;
        }

        if (this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }

        return (
            <PageContainer>
                <ReportFilterContainer>
                    <ReportFilterEditorDropdown
                        label={'Выберете аттестацию для формирования отчета:'}
                        storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectAttestations}
                    />
                    <ReportFilterButtonGenerateReport
                        eventStartGenerateReport={this.props.storePage.storeContentPage.eventStartGenerateReport}
                    />
                </ReportFilterContainer>
                <ReportAttestationSheetSmart store={this.props.storePage.storeContentPage.storeReportAttestationSheet}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonSelfReportAttestationSheet);
