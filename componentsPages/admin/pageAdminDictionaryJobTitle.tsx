import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import {
    AdminDictionaryJobTitle,
    AdminDictionaryJobTitleEditor,
    AdminDictionaryJobTitleFilters
} from "../../components/admin/directory";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import UserPlusIco from '../../img/svg_component/userPlus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageDictionaryJobTitle} from "../../stores/admin/jobTitle/storeAdminPageDictionaryJobTitle";

const TEXT_ADD_POSITION: string = 'Добавить должность';

/**
 * Страница "Справочник должности"
 */
class PageAdminDictionaryJobTitle extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryJobTitle>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryJobTitle>) {
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
                <AdminActionsButtonsDataManagement
                    buttonIco={<UserPlusIco/>}
                    buttonText={TEXT_ADD_POSITION}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryJobTitleFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionaryJobTitle store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryJobTitleEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryJobTitle);
