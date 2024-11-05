import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {StudentActionsButtonsDataManagement} from "../../components/student/studentActionsButtonsDataManagement";
import {StudentMyProjectList} from "../../components/student/studentMyProject/studentMyProject";
import StudentMyProjectEditor
    from "../../components/student/studentMyProject/studentMyProjectEditor/studentMyProjectEditor";
import StudentMyProjectFilters
    from "../../components/student/studentMyProject/studentMyProjectFilters/studentMyProjectFilters";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageSendProject} from "../../stores/common/pageSendProject/storeCommonPageSendProject";

class PageStudentMyProject extends React.Component<PageComponentProps<StoreCommonPageSendProject>> {

    constructor(props: PageComponentProps<StoreCommonPageSendProject>) {
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
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData} />
            );
        }

        return (
            <PageContainer>
                <StudentActionsButtonsDataManagement
                    buttonText={'Новый проект'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    buttonIco={<PlusIco />}
                />
                <StudentMyProjectFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <StudentMyProjectList store={this.props.storePage.storeContentPage} />
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination} />
                <StudentMyProjectEditor store={this.props.storePage.storeContentPage} />
            </PageContainer>
        );
    }
}

export default observer(PageStudentMyProject);
