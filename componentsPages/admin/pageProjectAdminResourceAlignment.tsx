import {observer} from "mobx-react";
import React from "react";
import AdminProjectResourceAlignmentEditor
    from "../../components/admin/adminProjectResourceAlignment/adminProjectResourceAlignmentEditor/adminProjectResourceAlignmentEditor";
import AdminProjectResourceAlignmentFilters
    from "../../components/admin/adminProjectResourceAlignment/adminProjectResourceAlignmentFilters/adminProjectResourceAlignmentFilters";
import AdminProjectResourceAlignmentItemsList
    from "../../components/admin/adminProjectResourceAlignment/adminProjectResourceAlignmentItemsList/adminProjectResourceAlignmentItemsList";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StorePageProjectAdminResourceAlignment
} from "../../stores/admin/projectAdminResourceAlignment/storePageProjectAdminResourceAlignment";

class PageProjectAdminResourceAlignment extends React.PureComponent<PageComponentProps<StorePageProjectAdminResourceAlignment>> {
    constructor(props: PageComponentProps<StorePageProjectAdminResourceAlignment>) {
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
                <AdminProjectResourceAlignmentFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminProjectResourceAlignmentItemsList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminProjectResourceAlignmentEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageProjectAdminResourceAlignment);
