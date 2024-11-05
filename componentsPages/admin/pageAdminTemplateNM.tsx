import {observer} from "mobx-react";
import React from "react";
import {AdminActionsButtonsDataManagement} from "../../components/admin/adminActionsButtonsDataManagement";
import AdminFiltersTemplateNM
    from "../../components/admin/adminTemplateNM/adminFiltersTemplateNM/adminFiltersTemplateNM";
import AdminTemplateNMEditor from "../../components/admin/adminTemplateNM/adminTemplateNMEditor/adminTemplateNMEditor";
import {AdminTemplateNMList} from "../../components/admin/adminTemplateNM/adminTemplateNMList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import PlusIco from "../../img/svg_component/plus.svg";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageTemplateNM} from "../../stores/admin/templateNM/storeAdminPageTemplateNM";

class PageAdminTemplateNM extends React.PureComponent<PageComponentProps<StoreAdminPageTemplateNM>> {
    constructor(props: PageComponentProps<StoreAdminPageTemplateNM>) {
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
                /> : null }
                <AdminFiltersTemplateNM store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminTemplateNMList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminTemplateNMEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminTemplateNM);
