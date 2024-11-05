import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportEmployeeGrowthStatisticsSmart} from "../../components/reports/reportEmployeeGrowthStatistics";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import ReportFilterEditorDateRange
    from "../../components/reports/reportFilterEditorDateRange/reportFilterEditorDateRange";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageReportEmployeeGrowthStatistics
} from "../../stores/admin/reports/reportEmployeeGrowthStatistics/storeAdminPageReportEmployeeGrowthStatistics";

class PageAdminReportEmployeeGrowthStatistics extends React.PureComponent<PageComponentProps<StoreAdminPageReportEmployeeGrowthStatistics>> {
    constructor(props: PageComponentProps<StoreAdminPageReportEmployeeGrowthStatistics>) {
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
                        <ReportFilterEditorsLayout layout={'3_column'}>
                            <ReportFilterEditorDropdown
                                label={'Завод:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectFactories}
                            />
                            <ReportFilterEditorDropdown
                                label={'Должность:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectPositions}
                            />
                            <ReportFilterEditorDropdown
                                label={'Подразделение:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectUnits}
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
                    <ReportEmployeeGrowthStatisticsSmart store={this.props.storePage.storeContentPage.storeReportEmployeeGrowthStatistics}/>
                </PageContainer>
            </PageContainer>
        );
    }
}

export default observer(PageAdminReportEmployeeGrowthStatistics);
