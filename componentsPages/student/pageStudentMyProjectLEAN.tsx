import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {StudentActionsButtonsDataManagement} from "../../components/student/studentActionsButtonsDataManagement";
import StudentMyProjectLEANList
    from "../../components/student/studentMyProjectLEAN/studentMyProjectLEAN/studentMyProjectLEANList";
import StudentMyProjectLEANEditor
    from "../../components/student/studentMyProjectLEAN/studentMyProjectLEANEditor/studentMyProjectLEANEditor";
import StudentMyProjectLEANFilters
    from "../../components/student/studentMyProjectLEAN/studentMyProjectLEANFilters/studentMyProjectLEANFilters";
import StudentResoursesEditor
    from "../../components/student/studentMyProjectLEAN/studentResoursesEditor/studentResoursesEditor";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageSendProjectLEAN} from "../../stores/common/pageSendProjectLEAN/storeCommonPageSendProjectLEAN";

class PageStudentMyProjectLEAN extends React.Component<PageComponentProps<StoreCommonPageSendProjectLEAN>> {

    constructor(props: PageComponentProps<StoreCommonPageSendProjectLEAN>) {
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
                <StudentActionsButtonsDataManagement
                    buttonText={'Новый проект LEAN'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    buttonIco={<PlusIco/>}
                />
                <StudentMyProjectLEANFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <StudentMyProjectLEANList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <StudentMyProjectLEANEditor store={this.props.storePage.storeContentPage}/>
                <StudentResoursesEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageStudentMyProjectLEAN);
