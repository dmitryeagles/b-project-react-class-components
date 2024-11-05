import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportProjectMini5sRegistry} from "../../../stores/repots/storeReportProjectMini5sRegistry";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import ReportProjectMini5sRegistry from "./reportProjectMini5sRegistry";

function ReportProjectMini5sRegistrySmart(props: SmartComponentProps<StoreReportProjectMini5sRegistry>) {

    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportProjectMini5sRegistry
            report={props.store.reportData.report}
            projectPublicName={props.store.reportData.projectPublicName}
           // exportPDFLink={props.store.reportData.exportPDFLink}
           // exportWordLink={props.store.reportData.exportWordLink}
        />
    );
}

export default observer(ReportProjectMini5sRegistrySmart);
