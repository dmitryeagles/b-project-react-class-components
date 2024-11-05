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
    StoreCommonPageContentSelfReportFinalTestingResults
} from "../../stores/common/pageSelfReportFinalTestingResults/storeCommonPageContentSelfReportFinalTestingResults";
import {
    StoreCommonPageSelfReportFinalTestingResults
} from "../../stores/common/pageSelfReportFinalTestingResults/storeCommonPageSelfReportFinalTestingResults";

const ReportFilterContainerStep = observer((props: SmartComponentProps<StoreCommonPageContentSelfReportFinalTestingResults>) => {
    return (
        <ReportFilterContainer>
            <ReportFilterEditorsLayout layout={'2_column'}>
                <ReportFilterEditorDropdown
                    label={'Шаг 1: выберите аттестацию'}
                    storeComponentDropdown={props.store.storeDropdownSelectAttestations}
                    helpLabel={'* Укажите аттестацию для формирования списка тестов'}
                />

                <ReportFilterEditorDropdownStep
                    label={'Шаг 2: выберите тест'}
                    storeComponentDropdown={props.store.storeDropdownSelectTests}
                    helpLabel={'* Укажите тест для формирования списка пользователей'}
                    selectedValue={props.store.storeDropdownSelectAttestations.getSelectedValue()}
                />
            </ReportFilterEditorsLayout>
            <ReportFilterButtonGenerateReport
                eventStartGenerateReport={props.store.eventStartGenerateReport}
                disabled={!props.store.storeDropdownSelectTests.getSelectedValue()}
            />
        </ReportFilterContainer>
    );
});

class PageCommonSelfReportFinalTestingResults extends React.Component<PageComponentProps<StoreCommonPageSelfReportFinalTestingResults>> {

    constructor(props: PageComponentProps<StoreCommonPageSelfReportFinalTestingResults>) {
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
                <ReportFilterContainerStep store={this.props.storePage.storeContentPage}/>
                <ReportFinalTestingResultsSmart store={this.props.storePage.storeContentPage.storeReportFinalTestingResults}/>
            </PageContainer>
        );
    }
}

export default observer(PageCommonSelfReportFinalTestingResults);
