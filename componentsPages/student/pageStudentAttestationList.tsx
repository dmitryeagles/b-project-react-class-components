import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {StudentAttestationList} from "../../components/student/studentAttestationList";
import StudentAttestationListFilters
    from "../../components/student/studentAttestationList/studentExamTestListFilters/studentAttestationListFilters";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreStudentPageAttestationList} from "../../stores/student/attestationList/storeStudentPageAttestationList";

class PageStudentAttestationList extends React.Component<PageComponentProps<StoreStudentPageAttestationList>> {

    constructor(props: PageComponentProps<StoreStudentPageAttestationList>) {
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
                <StudentAttestationListFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <StudentAttestationList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
            </PageContainer>
        );
    }
}

export default observer(PageStudentAttestationList);
