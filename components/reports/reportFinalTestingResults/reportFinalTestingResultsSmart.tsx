import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportFinalTestingResults} from "../../../stores/repots/storeReportFinalTestingResults";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import ReportFinalTestingResults from "./reportFinalTestingResults";

function ReportFinalTestingResultsSmart(props: SmartComponentProps<StoreReportFinalTestingResults>) {

    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report.reportData.length) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportFinalTestingResults
            report={props.store.reportData.report}
            testPublicName={props.store.reportData.testPublicName}
            attestationPublicName={props.store.reportData.attestationPublicName}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />);
}

export default observer(ReportFinalTestingResultsSmart);
