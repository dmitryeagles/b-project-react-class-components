import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionaryArea from "../../components/admin/directory/adminDictionaryArea/adminDictionaryArea";
import AdminDictionaryAreaEditor
    from "../../components/admin/directory/adminDictionaryArea/adminDictionaryEditor/adminDictionaryAreaEditor";
import AdminDictionaryAreaFilters
    from "../../components/admin/directory/adminDictionaryArea/adminDictionaryFilters/adminDictionaryAreaFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageDictionaryArea} from "../../stores/admin/area/storeAdminPageDictionaryArea";

const TEXT_ADD_AREA: string = 'Добавить участок / оборудования';

/**
 * Страница "Справочник участка"
 */
class PageAdminDictionaryArea extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryArea>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryArea>) {
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
            return (<StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>);
        }

        return (
            <PageContainer>
                <AdminActionsButtonsDataManagement
                    buttonIco={<PlusIco/>}
                    buttonText={TEXT_ADD_AREA}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryAreaFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionaryArea store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryAreaEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryArea);
