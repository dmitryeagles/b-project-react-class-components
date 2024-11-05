import {observer} from "mobx-react";
import React from "react";
import {AdminTestListFilters} from "../../../components/admin/adminExamTest/adminExamTestListFilters";
import {AdminExamTestsActionButtons} from "../../../components/admin/adminExamTest/adminExamTestsActionButtons";
import AdminExamTestsList from "../../../components/admin/adminExamTest/adminExamTestsList/adminExamTestsList";
import {FormatViewItems} from "../../../components/common/formatViewItems";
import {Paginate} from "../../../components/common/paginate";
import {StubDataLoading} from "../../../components/common/stubDataLoading";
import {StubErrorGetData} from "../../../components/common/stubErrorGetData";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreAdminPageContentTestListMain} from "../../../stores/admin/testList/storeAdminPageContentTestListMain";


class PageContentAdminTestList extends React.PureComponent<SmartComponentProps<StoreAdminPageContentTestListMain>> {
    constructor(props: SmartComponentProps<StoreAdminPageContentTestListMain>) {
        super(props);
    }

    public componentDidMount() {
        this.props.store.eventShowPageExamTestsList();
    }

    public render() {

        if (this.props.store.storeErrorWhileGettingData.errorText) {
            return (<StubErrorGetData errorText={this.props.store.storeErrorWhileGettingData.errorText}/>);
        }

        if (!this.props.store.storeFlagDataReceived.status) {
            return (<StubDataLoading loadingDataText={'Загрузка тестов'}/>);
        }

        return (
            <>
                <AdminExamTestsActionButtons linkAddNewExamTest={this.props.store.linkCreateNewExamTest}/>
                <AdminTestListFilters store={this.props.store.storeFilters}/>
                <FormatViewItems store={this.props.store.storeSelectViewCatalog}/>
                <AdminExamTestsList store={this.props.store}/>
                <Paginate store={this.props.store.storeDataPagination}/>
            </>
        );
    }
}

export default observer(PageContentAdminTestList);
