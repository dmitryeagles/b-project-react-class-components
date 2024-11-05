import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportAssignedTestingResults} from "../../../stores/repots/storeReportAssignedTestingResults";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import {ReportAssignedResults} from "./index";

function ReportAssignedResultsSmart(props: SmartComponentProps<StoreReportAssignedTestingResults>) {

    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report.reportData.length) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportAssignedResults
            report={props.store.reportData.report}
            testPublicName={props.store.reportData.testPublicName}
            attestationPublicName={props.store.reportData.attestationPublicName}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />);
}

export default observer(ReportAssignedResultsSmart);
