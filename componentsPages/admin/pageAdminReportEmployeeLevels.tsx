import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportEmployeeLevelsSmart} from "../../components/reports/reportEmployeeLevels";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageReportEmployeeLevels
} from "../../stores/admin/reports/reportEmployeeLevels/storeAdminPageReportEmployeeLevels";

class PageAdminReportEmployeeLevels extends React.PureComponent<PageComponentProps<StoreAdminPageReportEmployeeLevels>> {
    constructor(props: PageComponentProps<StoreAdminPageReportEmployeeLevels>) {
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
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectFactory}
                            />
                            <ReportFilterEditorDropdown
                                label={'Подразделения:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectUnit}
                            />
                            <ReportFilterEditorDropdown
                                label={'Должность:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectPosition}
                            />
                            <ReportFilterEditorDropdown
                                label={'Аттестация:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectAttestations}
                            />
                        </ReportFilterEditorsLayout>
                        <ReportFilterButtonGenerateReport
                            eventStartGenerateReport={this.props.storePage.storeContentPage.eventStartGenerateReport}
                        />
                    </ReportFilterContainer>
                    <ReportEmployeeLevelsSmart store={this.props.storePage.storeContentPage.storeReportEmployeeLevels}/>
                </PageContainer>
            </PageContainer>
        );
    }
}

export default observer(PageAdminReportEmployeeLevels);
