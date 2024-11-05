import {observer} from "mobx-react";
import React from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {ReportChoice} from "../../components/reports/reportChoice";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreStudentPageChoiceReport} from "../../stores/student/choiceReport/storeStudentPageChoiceReport";

class PageStudentChoiceReport extends React.Component<PageComponentProps<StoreStudentPageChoiceReport>> {

    constructor(props: PageComponentProps<StoreStudentPageChoiceReport>) {
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

        return (
            <PageContainer>
                <ReportChoice reportsPagesList={this.props.storePage.storeContentPage.reportsPages}/>
            </PageContainer>
        );
    }
}

export default observer(PageStudentChoiceReport);
