import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportEmployeeLevels} from "../../../stores/repots/storeReportEmployeeLevels";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import ReportEmployeeLevels from "./reportEmployeeLevels";


function ReportEmployeeLevelsSmart(props: SmartComponentProps<StoreReportEmployeeLevels>) {

    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report.reportRows.length) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportEmployeeLevels
            report={props.store.reportData.report}
            unitPublicName={props.store.reportData.unitPublicName}
            attestationPublicName={props.store.reportData.attestationPublicName}
            positionPublicName={props.store.reportData.positionPublicName}
            factoryPublicName={props.store.reportData.factoryPublicName}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />
    );
}

export default observer(ReportEmployeeLevelsSmart);
