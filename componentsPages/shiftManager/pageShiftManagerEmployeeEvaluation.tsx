import {observer} from "mobx-react";
import React from "react";
import {FormatViewItems} from "../../components/common/formatViewItems";
import {PageContainer} from "../../components/common/pageContainer";
import {Paginate} from "../../components/common/paginate";
import {StubErrorGetData} from "../../components/common/stubErrorGetData";
import {
    ShiftManagerEmployeeEvaluationButtonsDataManagement
} from "../../components/shiftManager/shiftManagerEmployeeEvaluation/shiftManagerEmployeeEvaluationButtonsDataManagement";
import {
    ShiftManagerEmployeeEvaluationEditor
} from "../../components/shiftManager/shiftManagerEmployeeEvaluation/shiftManagerEmployeeEvaluationEditor";
import ShiftManagerEmployeeEvaluationFilters
    from "../../components/shiftManager/shiftManagerEmployeeEvaluation/shiftManagerEmployeeEvaluationFilters/shiftManagerEmployeeEvaluationFilters";
import {
    ShiftManagerEmployeeEvaluationList
} from "../../components/shiftManager/shiftManagerEmployeeEvaluation/shiftManagerEmployeeEvaluationList";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {
    StoreShiftManagerPageEmployeeEvaluation
} from "../../stores/shiftManager/employeeEvaluation/storeShiftManagerPageEmployeeEvaluation";

class PageShiftManagerEmployeeEvaluation extends React.Component<PageComponentProps<StoreShiftManagerPageEmployeeEvaluation>> {

    constructor(props: PageComponentProps<StoreShiftManagerPageEmployeeEvaluation>) {
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
                <ShiftManagerEmployeeEvaluationButtonsDataManagement
                    eventStartAddNewUser={this.props.storePage.storeContentPage.eventStartAddNewItem}
                    eventStartEditUsersList={this.props.storePage.storeContentPage.eventStartEditUsersList}
                />
                <ShiftManagerEmployeeEvaluationFilters store={this.props.storePage.storeContentPage.storeFilters}/>
                <FormatViewItems store={this.props.storePage.storeContentPage.storeSelectViewCatalog}/>
                <ShiftManagerEmployeeEvaluationList store={this.props.storePage.storeContentPage}/>
                <Paginate store={this.props.storePage.storeContentPage.storeDataPagination}/>
                <ShiftManagerEmployeeEvaluationEditor store={this.props.storePage.storeContentPage}/>
            </PageContainer>
        );
    }
}

export default observer(PageShiftManagerEmployeeEvaluation);
