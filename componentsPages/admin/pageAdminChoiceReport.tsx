import React, {useEffect} from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {ReportChoice} from "../../components/reports/reportChoice";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreAdminPageChoiceReport} from "../../stores/admin/choiceReport/storeAdminPageChoiceReport";

function PageAdminChoiceReport(props: PageComponentProps<StoreAdminPageChoiceReport>) {
    useEffect(() => {
        props.storePage.eventPageShown();
    }, [])

    return (
        <PageContainer>
            <ReportChoice reportsPagesList={props.storePage.pagesReports}/>
        </PageContainer>
    );
}

export default React.memo(PageAdminChoiceReport);
