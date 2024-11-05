import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import {ReportGeneralResultsWorkSmart} from "../../components/reports/reportGeneralResultsWork";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageReportGeneralResultsWork
} from "../../stores/admin/reports/reportGeneralResultsWork/storeAdminPageReportGeneralResultsWork";

class PageAdminReportGeneralResultsWork extends React.PureComponent<PageComponentProps<StoreAdminPageReportGeneralResultsWork>> {
    constructor(props: PageComponentProps<StoreAdminPageReportGeneralResultsWork>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    public render() {
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
                <PageContainer>
                    <ReportFilterContainer>
                        <ReportFilterEditorsLayout layout={'2_column'}>
                            <ReportFilterEditorDropdown
                                label={'Аттестация:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectAttestations}
                            />
                            <ReportFilterEditorDropdown
                                label={'Сотрудник:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectUsers}
                            />
                        </ReportFilterEditorsLayout>
                        <ReportFilterButtonGenerateReport
                            eventStartGenerateReport={this.props.storePage.storeContentPage.eventStartGenerateReport}
                        />
                    </ReportFilterContainer>
                    <ReportGeneralResultsWorkSmart store={this.props.storePage.storeContentPage.storeReportGeneralResultsWork}/>
                </PageContainer>
            </PageContainer>
        );
    }
}

export default observer(PageAdminReportGeneralResultsWork);
