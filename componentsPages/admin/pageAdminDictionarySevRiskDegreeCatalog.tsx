import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionarySevRiskDegreeCatalog
    from "../../components/admin/directory/adminDictionarySevRiskDegreeCatalog/adminDictionarySevRiskDegreeCatalog";
import AdminDictionarySevRiskDegreeCatalogEditor
    from "../../components/admin/directory/adminDictionarySevRiskDegreeCatalog/adminDictionarySevRiskDegreeCatalogEditor/adminDictionarySevRiskDegreeCatalogEditor";
import AdminDictionarySevRiskDegreeCatalogFilters
    from "../../components/admin/directory/adminDictionarySevRiskDegreeCatalog/adminDictionarySevRiskDegreeCatalogFilters/adminDictionarySevRiskDegreeCatalogFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionarySevRiskDegreeCatalog
} from "../../stores/admin/SevRiskDegreeCatalog/storeAdminPageDictionarySevRiskDegreeCatalog";

const TEXT_ADD_OBSERVABLE_CATALOG: string = 'Добавить степень риска';

/**
 * Страница "Степень риска"
 */
class PageAdminDictionarySevRiskDegreeCatalog extends React.PureComponent<PageComponentProps<StoreAdminPageDictionarySevRiskDegreeCatalog>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionarySevRiskDegreeCatalog>) {
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
                <AdminDictionarySevRiskDegreeCatalogFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionarySevRiskDegreeCatalog store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionarySevRiskDegreeCatalogEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionarySevRiskDegreeCatalog);
