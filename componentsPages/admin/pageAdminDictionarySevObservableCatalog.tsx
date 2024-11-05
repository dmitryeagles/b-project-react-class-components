import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionarySevObservableCatalog
    from "../../components/admin/directory/adminDictionarySevObservableCatalog/adminDictionarySevObservableCatalog";
import AdminDictionarySevObservableCatalogEditor
    from "../../components/admin/directory/adminDictionarySevObservableCatalog/adminDictionarySevObservableCatalogEditor/adminDictionarySevObservableCatalogEditor";
import AdminDictionarySevObservableCatalogFilters
    from "../../components/admin/directory/adminDictionarySevObservableCatalog/adminDictionarySevObservableCatalogFilters/adminDictionarySevObservableCatalogFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionarySevObservableCatalog
} from "../../stores/admin/SevObservableCatalog/storeAdminPageDictionarySevObservableCatalog";

const TEXT_ADD_OBSERVABLE_CATALOG: string = 'Добавить наблюдаемого';

/**
 * Страница "Справочник видов SEV"
 */
class PageAdminDictionarySevObservableCatalog extends React.PureComponent<PageComponentProps<StoreAdminPageDictionarySevObservableCatalog>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionarySevObservableCatalog>) {
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
                    buttonText={TEXT_ADD_OBSERVABLE_CATALOG}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionarySevObservableCatalogFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionarySevObservableCatalog store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionarySevObservableCatalogEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionarySevObservableCatalog);
