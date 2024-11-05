import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {ReportFilterButtonGenerateReport} from "../../components/reports/reportFilterButtonGenerateReport";
import {ReportFilterContainer} from "../../components/reports/reportFilterContainer";
import {ReportFilterEditorDropdown} from "../../components/reports/reportFilterEditorDropdown";
import {ReportFilterEditorsLayout} from "../../components/reports/reportFilterEditorsLayout";
import {ReportProtocolAttestationCommissionSmart} from "../../components/reports/reportProtocolAttestationCommission";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageReportProtocolAttestationCommission
} from "../../stores/admin/reports/reportProtocolAttestationCommission/storeAdminPageReportProtocolAttestationCommission";

class PageAdminReportProtocolAttestationCommission extends React.PureComponent<PageComponentProps<StoreAdminPageReportProtocolAttestationCommission>> {
    constructor(props: PageComponentProps<StoreAdminPageReportProtocolAttestationCommission>) {
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
                                label={'Подразделения:'}
                                storeComponentDropdown={this.props.storePage.storeContentPage.storeDropdownSelectUnit}
                            />
                        </ReportFilterEditorsLayout>
                        <ReportFilterButtonGenerateReport
                            eventStartGenerateReport={this.props.storePage.storeContentPage.eventStartGenerateReport}
                        />
                    </ReportFilterContainer>
                    <ReportProtocolAttestationCommissionSmart store={this.props.storePage.storeContentPage.storeReportProtocolAttestationCommission}/>
                </PageContainer>
            </PageContainer>
        );
    }
}

export default observer(PageAdminReportProtocolAttestationCommission);
