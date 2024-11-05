import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportGeneralResultsWorkSmart} from "../../components/reports/reportGeneralResultsWork";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreCommonPageSelfReportGeneralResultsWork
} from "../../stores/common/pageSelfReportGeneralResultsWork/storeCommonPageSelfReportGeneralResultsWork";


class PageCommonSelfReportGeneralResultsWork extends React.Component<PageComponentProps<StoreCommonPageSelfReportGeneralResultsWork>> {

    constructor(props: PageComponentProps<StoreCommonPageSelfReportGeneralResultsWork>) {
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
                <ReportGeneralResultsWorkSmart
                    store={this.props.storePage.storeContentPage.storeReportGeneralResultsWork}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonSelfReportGeneralResultsWork);
