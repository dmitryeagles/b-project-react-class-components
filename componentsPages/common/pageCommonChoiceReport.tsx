import React, {useEffect} from "react";
import {PageContainer} from "../../components/common/pageContainer";
import {ReportChoice} from "../../components/reports/reportChoice";
import {PageComponentProps} from "../../interfaces/pageComponentProps";
import {StoreCommonPageChoiceReport} from "../../stores/common/pageChoiceReport/storeCommonPageChoiceReport";

function PageCommonChoiceReport(props: PageComponentProps<StoreCommonPageChoiceReport>){
    useEffect(() => {
        props.storePage.eventPageShown();
    }, [])

    return (
        <PageContainer>
            <ReportChoice reportsPagesList={props.storePage.pagesList}/>
        </PageContainer>
    );
}

export default React.memo(PageCommonChoiceReport);