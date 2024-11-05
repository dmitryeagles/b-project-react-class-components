import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {StudentAssignedTestsList} from "../../components/student/studentAssignedTestsList";
import StudentAssignedTestsListFilters
    from "../../components/student/studentAssignedTestsList/studentAssignedTestsListFilters/studentAssignedTestsListFilters";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreStudentPageAssignedTests} from "../../stores/student/assignedTests/storeStudentPageAssignedTests";

class PageStudentAssignedTests extends React.Component<PageComponentProps<StoreStudentPageAssignedTests>> {

    constructor(props: PageComponentProps<StoreStudentPageAssignedTests>) {
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
                <StudentAssignedTestsListFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <StudentAssignedTestsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
            </PageContainer>
        );
    }
}

export default observer(PageStudentAssignedTests);
