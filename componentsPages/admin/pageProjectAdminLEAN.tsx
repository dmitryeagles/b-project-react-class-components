import {observer} from "mobx-react";
import React from "react";
import ProjectAdminLEANEditor
    from "../../components/admin/projectAdminLEAN/projectAdminLEANEditor/projectAdminLEANEditor";
import ProjectAdminLEANFilters
    from "../../components/admin/projectAdminLEAN/projectAdminLEANFilters/projectAdminLEANFilters";
import ProjectAdminLEANItemsList
    from "../../components/admin/projectAdminLEAN/projectAdminLEANItemsList/projectAdminLEANItemsList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StorePageProjectAdminLEAN} from "../../stores/admin/projectAdminLEAN/storePageProjectAdminLEAN";

class PageProjectAdminLEAN extends React.PureComponent<PageComponentProps<StorePageProjectAdminLEAN>> {
    constructor(props: PageComponentProps<StorePageProjectAdminLEAN>) {
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
                <ProjectAdminLEANFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ProjectAdminLEANItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ProjectAdminLEANEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageProjectAdminLEAN);
