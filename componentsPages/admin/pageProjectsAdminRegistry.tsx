import {observer} from "mobx-react";
import React from "react";
import {
    AdminProjectsRegistryActionButtonExport
} from "../../components/admin/adminProjectsRegistry/adminProjectsRegistryActionButtonExport";
import AdminProjectsRegistryEditor
    from "../../components/admin/adminProjectsRegistry/adminProjectsRegistryEditor/adminProjectsRegistryEditor";
import AdminProjectsRegistryFilters
    from "../../components/admin/adminProjectsRegistry/adminProjectsRegistryFilters/adminProjectsRegistryFilters";
import AdminProjectsRegistryItemsList
    from "../../components/admin/adminProjectsRegistry/adminProjectsRegistryItemsList/adminProjectsRegistryItemsList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StorePageProjectsAdminRegistry} from "../../stores/admin/projectsAdminRegistry/storePageProjectsAdminRegistry";

class PageProjectsAdminRegistry extends React.PureComponent<PageComponentProps<StorePageProjectsAdminRegistry>> {
    constructor(props: PageComponentProps<StorePageProjectsAdminRegistry>) {
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

        if(this.props.storePage.storeContentPage.errorWhileGettingData){
            return (
                <StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>
            );
        }

        return (
            <PageContainer>
                <AdminProjectsRegistryActionButtonExport/>
                <AdminProjectsRegistryFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminProjectsRegistryItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminProjectsRegistryEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageProjectsAdminRegistry);
