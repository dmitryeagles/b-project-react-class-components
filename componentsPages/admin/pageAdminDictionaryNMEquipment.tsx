import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionaryNMEquipmentEditor
    from "../../components/admin/directory/adminDictionaryNMEquipment/adminDictionaryEditor/adminDictionaryNMEquipmentEditor";
import AdminDictionaryNMEquipmentFilters
    from "../../components/admin/directory/adminDictionaryNMEquipment/adminDictionaryFilters/adminDictionaryNMEquipmentFilters";
import AdminDictionaryNMEquipment
    from "../../components/admin/directory/adminDictionaryNMEquipment/adminDictionaryNMEquipment";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionaryNMEquipment
} from "../../stores/admin/dictionaryNMEquipment/storeAdminPageDictionaryNMEquipment";

class PageAdminDictionaryNMEquipment extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryNMEquipment>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryNMEquipment>) {
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
                    buttonText={'Добавить оборудование'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryNMEquipmentFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionaryNMEquipment store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryNMEquipmentEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryNMEquipment);
