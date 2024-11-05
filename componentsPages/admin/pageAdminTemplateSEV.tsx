import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminFiltersTemplateSEV
    from "../../components/admin/adminTemplateSEV/adminFiltersTemplateSEV/adminFiltersTemplateSEV";
import AdminTemplateSEVEditor
    from "../../components/admin/adminTemplateSEV/adminTemplateSEVEditor/adminTemplateSEVEditor";
import {AdminTemplateSEVList} from "../../components/admin/adminTemplateSEV/adminTemplateSEVList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from "../../img/svg_component/plus.svg";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageTemplateSEV} from "../../stores/admin/templateSEV/storeAdminPageTemplateSEV";

class PageAdminTemplateSEV extends React.PureComponent<PageComponentProps<StoreAdminPageTemplateSEV>> {
    constructor(props: PageComponentProps<StoreAdminPageTemplateSEV>) {
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
                { this.props.storePage.storeContentPage.isCanEditTemplate ?
                <AdminActionsButtonsDataManagement
                    buttonIco={<PlusIco/>}
                    buttonText={'Добавить шаблон'}
                    eventStartAddNewItem={this.props.storePage.storeContentPage.eventStartAddNewItem}
                /> : null}
                <AdminFiltersTemplateSEV store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminTemplateSEVList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminTemplateSEVEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminTemplateSEV);
