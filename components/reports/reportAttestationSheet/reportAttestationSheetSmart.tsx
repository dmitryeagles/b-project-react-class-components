import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportAttestationSheet} from "../../../stores/repots/storeReportAttestationSheet";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import ReportAttestationSheet from "./reportAttestationSheet";

function ReportAttestationSheetSmart(props: SmartComponentProps<StoreReportAttestationSheet>) {
    if (!props.store.reportData) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.report.reportData.length) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportAttestationSheet
            reportData={props.store.reportData.report}
            attestationPublicName={props.store.reportData.attestationPublicName}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />
    );

}

export default observer(ReportAttestationSheetSmart);
