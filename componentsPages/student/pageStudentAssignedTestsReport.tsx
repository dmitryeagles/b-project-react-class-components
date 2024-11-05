import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import ReportAssignedResultsSmart from "../../components/reports/reportAssignedResults/reportAssignedResultsSmart";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreStudentPageAssignedTestsReport
} from "../../stores/student/assignedTestsReport/storeStudentPageAssignedTestsReport";

class PageStudentAssignedTestsReport extends React.Component<PageComponentProps<StoreStudentPageAssignedTestsReport>> {
    constructor(props: PageComponentProps<StoreStudentPageAssignedTestsReport>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    render() {
        if(!this.props.storePage.storeContentPage){
            return null;
        }

        if(this.props.storePage.storeContentPage.errorWhileGettingData){
            return(<StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData} />);
        }

        return (
            <PageContainer>
                <ReportAssignedResultsSmart store={this.props.storePage.storeContentPage.storeReportAssignedTestingResults}/>
            </PageContainer>
        );
    }
}

export default observer(PageStudentAssignedTestsReport);
