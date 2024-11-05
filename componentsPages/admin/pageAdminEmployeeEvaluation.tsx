import {observer} from "mobx-react";
import React from "react";
import {
    AdminEmployeeEvaluationButtonsDataManagement
} from "../../components/admin/adminEmployeeEvaluation/adminEmployeeEvaluationButtonsDataManagement";
import {
    AdminEmployeeEvaluationEditor
} from "../../components/admin/adminEmployeeEvaluation/adminEmployeeEvaluationEditor";
import {
    AdminEmployeeEvaluationFilters
} from "../../components/admin/adminEmployeeEvaluation/adminEmployeeEvaluationFilters";
import {
    AdminEmployeeEvaluationList
} from "../../components/admin/adminEmployeeEvaluation/shiftManagerEmployeeEvaluationList";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageEmployeeEvaluation} from "../../stores/admin/employeeEvaluation/storeAdminPageEmployeeEvaluation";

class PageAdminEmployeeEvaluation extends React.Component<PageComponentProps<StoreAdminPageEmployeeEvaluation>> {

    constructor(props: PageComponentProps<StoreAdminPageEmployeeEvaluation>) {
        super(props);
    }

    public componentDidMount() {
        this.props.storePage.eventPageShown();
    }

    public componentWillUnmount() {
        this.props.storePage.eventPageExit();
    }

    render() {
        if (!this.props.storePage.storeContentPage) {
            return null;
        }

        if (this.props.storePage.storeContentPage.errorWhileGettingData) {
            return (<StubErrorGetData errorText={this.props.storePage.storeContentPage.errorWhileGettingData}/>);
        }

        return (
            <PageContainer>
                <AdminEmployeeEvaluationButtonsDataManagement
                    eventStartAddNewUser={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    eventStartEditUsersList={this.props.storePage.storeContentPage.eventStartEditUsersList}
                />
                <AdminEmployeeEvaluationFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <AdminEmployeeEvaluationList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <AdminEmployeeEvaluationEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageAdminEmployeeEvaluation);
