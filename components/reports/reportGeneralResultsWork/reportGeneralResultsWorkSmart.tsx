import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportGeneralResultsWork} from "../../../stores/repots/storeReportGeneralResultsWork";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import ReportGeneralResultsWork from "./reportGeneralResultsWork";

function ReportGeneralResultsWorkSmart(props: SmartComponentProps<StoreReportGeneralResultsWork>) {

    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report.reportData.length) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportGeneralResultsWork
            reportGeneralResultsWorData={props.store.reportData.report}
            attestationPublicName={props.store.reportData.attestationPublicName}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />
    );
}

export default observer(ReportGeneralResultsWorkSmart);
