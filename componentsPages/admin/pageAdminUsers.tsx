import {observer} from "mobx-react";
import React from "react";
import {
    AdminPopupAddUsersFromFile,
    AdminPopupGetEmployeeHistoryUser,
    AdminUsersActionButtons,
    AdminUsersEditor,
    AdminUsersFilters
} from "../../components/admin/adminUsers";
import AdminUsers from "../../components/admin/adminUsers/adminUsers";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import Paginate from "../../components/common/paginate/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageUsers} from "../../stores/admin/users/storeAdminPageUsers";

class PageAdminUsers extends React.PureComponent<PageComponentProps<StoreAdminPageUsers>> {
    constructor(props: PageComponentProps<StoreAdminPageUsers>) {
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
                <AdminUsersActionButtons store={this.props.storePage.storeContentPage}/>
                <AdminUsersFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <AdminUsers store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminUsersEditor store={this.props.storePage.storeContentPage}/>
                <AdminPopupAddUsersFromFile store={this.props.storePage.storeContentPage}/>
                <AdminPopupGetEmployeeHistoryUser store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminUsers);
