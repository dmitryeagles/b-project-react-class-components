import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import ReportAttestationSheetSmart from "../../components/reports/reportAttestationSheet/reportAttestationSheetSmart";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageReportAttestationSheet
} from "../../stores/admin/reports/reportAttestationSheet/storeAdminPageReportAttestationSheet";

class PageAdminReportAttestationSheet extends React.PureComponent<PageComponentProps<StoreAdminPageReportAttestationSheet>> {
    constructor(props: PageComponentProps<StoreAdminPageReportAttestationSheet>) {
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
                    <ReportAttestationSheetSmart store={this.props.storePage.storeContentPage.storeReportAttestationSheet}/>
                </PageContainer>
            </PageContainer>
        );
    }
}

export default observer(PageAdminReportAttestationSheet);
