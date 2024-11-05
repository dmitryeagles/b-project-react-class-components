import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {StudentExamTestList} from "../../components/student/studentExamTestList";
import StudentExamTestListFilters
    from "../../components/student/studentExamTestList/studentExamTestListFilters/studentExamTestListFilters";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreStudentPageExamTestList} from "../../stores/student/examTestList/storeStudentPageExamTestList";

class PageStudentTestList extends React.Component<PageComponentProps<StoreStudentPageExamTestList>> {

    constructor(props: PageComponentProps<StoreStudentPageExamTestList>) {
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
            return (<StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>);
        }

        return (
            <PageContainer>
                <StudentExamTestListFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <StudentExamTestList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
            </PageContainer>
        );
    }
}

export default observer(PageStudentTestList);
