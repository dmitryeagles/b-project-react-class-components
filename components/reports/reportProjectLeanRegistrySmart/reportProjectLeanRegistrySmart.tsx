import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportProjectLeanRegistry} from "../../../stores/repots/storeReportProjectLeanRegistry";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import {ReportProjectLeanRegistry} from "./index";

function ReportProjectLeanRegistrySmart(props: SmartComponentProps<StoreReportProjectLeanRegistry>) {

    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportProjectLeanRegistry
            report={props.store.reportData.report}
            projectPublicName={props.store.reportData.projectPublicName}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />
    );
}

export default observer(ReportProjectLeanRegistrySmart);
