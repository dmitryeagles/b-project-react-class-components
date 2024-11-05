import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminDictionaryKPIImpactsCategory
    from "../../components/admin/directory/adminDictionaryKPIImpactsCategory/adminDictionaryKPIImpactsCategory";
import AdminDictionaryKPIImpactsCategoryEditor
    from "../../components/admin/directory/adminDictionaryKPIImpactsCategory/adminDictionaryKPIImpactsCategoryEditor/adminDictionaryKPIImpactsCategoryEditor";
import AdminDictionaryKPIImpactsCategoryFilters
    from "../../components/admin/directory/adminDictionaryKPIImpactsCategory/adminDictionaryKPIImpactsCategoryFilters/adminDictionaryKPIImpactsCategoryFilters";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from '../../img/svg_component/plus.svg';
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreAdminPageDictionaryKPIImpactsCategory
} from "../../stores/admin/KPIImpactsCategory/storeAdminPageDictionaryKPIImpactsCategory";


class PageAdminDictionaryKPIImpactsCategory extends React.PureComponent<PageComponentProps<StoreAdminPageDictionaryKPIImpactsCategory>> {
    constructor(props: PageComponentProps<StoreAdminPageDictionaryKPIImpactsCategory>) {
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
                    buttonText={'Добавить категорию KPI воздействия'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                />
                <AdminDictionaryKPIImpactsCategoryFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminDictionaryKPIImpactsCategory store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminDictionaryKPIImpactsCategoryEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminDictionaryKPIImpactsCategory);
