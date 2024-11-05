import {observer} from "mobx-react";
import React from "react";
import ProjectAdminMini5sEditor
    from "../../components/admin/projectAdminMini5s/projectAdminMini5sEditor/projectAdminMini5sEditor";
import ProjectAdminMini5sFilters
    from "../../components/admin/projectAdminMini5s/projectAdminMini5sFilters/projectAdminMini5sFilters";
import ProjectAdminMini5sItemsList
    from "../../components/admin/projectAdminMini5s/projectAdminMini5sItemsList/projectAdminMini5sItemsList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StorePageProjectAdminMini5s} from "../../stores/admin/projectAdminMini5s/storePageProjectAdminMini5s";

class PageProjectAdminMini5s extends React.PureComponent<PageComponentProps<StorePageProjectAdminMini5s>> {
    constructor(props: PageComponentProps<StorePageProjectAdminMini5s>) {
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
                <ProjectAdminMini5sFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ProjectAdminMini5sItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ProjectAdminMini5sEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageProjectAdminMini5s);
