import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorDropdownStep} from "../../components/reports/reportFilterEditorDropdownStep";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import ReportFinalTestingResultsSmart
    from "../../components/reports/reportFinalTestingResults/reportFinalTestingResultsSmart";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {SmartComponentProps} from "../../interfaces/smartComponentProps";
import {
    StoreReportFinalTestingResultsAdminPageContent
} from "../../stores/repots/reportPageContent/storeReportFinalTestingResultsAdminPageContent";
import {
    StoreShiftManagerPageReportFinalTestingResults
} from "../../stores/shiftManager/reports/reportFinalTestingResults/storeShiftManagerPageReportFinalTestingResults";

const ReportFilterContainerStep = observer((props: SmartComponentProps<StoreReportFinalTestingResultsAdminPageContent>) => {
    return (
        <ReportFilterContainer>
            <ReportFilterEditorsLayout layout={'3_column'}>
                <ReportFilterEditorDropdown
                    label={'Шаг 1: выберите аттестацию'}
                    storeComponentDropdown={props.store.storeDropdownSelectAttestations}
                    helpLabel={'* Укажите аттестацию для формирования списка сотрудников'}
                />
                <ReportFilterEditorDropdownStep
                    label={'Шаг 2: выберите сотрудника'}
                    storeComponentDropdown={props.store.storeDropdownSelectUsers}
                    helpLabel={'* Укажите сотрудника для формирования списка тестов'}
                    selectedValue={props.store.storeDropdownSelectAttestations.getSelectedValue()}
                />
                <ReportFilterEditorDropdownStep
                    label={'Шаг 3: выберите тест'}
                    storeComponentDropdown={props.store.storeDropdownSelectTests}
                    helpLabel={'* Укажите тест для формирования отчета'}
                    selectedValue={props.store.storeDropdownSelectUsers.getSelectedValue()}
                />
            </ReportFilterEditorsLayout>
            <ReportFilterButtonGenerateReport
                eventStartGenerateReport={props.store.eventStartGenerateReport}
                disabled={!props.store.storeDropdownSelectTests.getSelectedValue()}
            />
        </ReportFilterContainer>
    );
});

class PageShiftManagerReportFinalTestingResults extends React.PureComponent<PageComponentProps<StoreShiftManagerPageReportFinalTestingResults>> {
    constructor(props: PageComponentProps<StoreShiftManagerPageReportFinalTestingResults>) {
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
                <ReportFilterContainerStep store={this.props.storePage.storeContentPage}/>
                <ReportFinalTestingResultsSmart store={this.props.storePage.storeContentPage.storeReportFinalTestingResults}/>
            </PageContainer>
        );
    }
}

export default observer(PageShiftManagerReportFinalTestingResults);
