import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import ReportFilterEditorDateRange
    from "../../components/reports/reportFilterEditorDateRange/reportFilterEditorDateRange";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import {
    ReportGeneralEmployeeGrowthStatisticsSmart
} from "../../components/reports/reportGeneralEmployeeGrowthStatistics";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageReportGeneralEmployeeGrowthStatistics
} from "../../stores/admin/reports/reportGeneralEmployeeGrowthStatistics/storeAdminPageReportGeneralEmployeeGrowthStatistics";

class PageAdminReportGeneralEmployeeGrowthStatistics extends React.PureComponent<PageComponentProps<StoreAdminPageReportGeneralEmployeeGrowthStatistics>> {
    constructor(props: PageComponentProps<StoreAdminPageReportGeneralEmployeeGrowthStatistics>) {
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
                                label={'Завод:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectFactories}
                            />
                            <ReportFilterEditorDateRange
                                label={'Период аттестации:'}
                                storeComponentDateRangePicker={this.props.storePage.storeContentPage.storeDateRangePicker}
                            />
                        </ReportFilterEditorsLayout>
                        <ReportFilterButtonGenerateReport
                            eventStartGenerateReport={this.props.storePage.storeContentPage.eventStartGenerateReport}
                        />
                    </ReportFilterContainer>
                    <ReportGeneralEmployeeGrowthStatisticsSmart store={this.props.storePage.storeContentPage.storeReportGeneralEmployeeGrowthStatistics}/>
                </PageContainer>
            </PageContainer>
        );
    }
}

export default observer(PageAdminReportGeneralEmployeeGrowthStatistics);
