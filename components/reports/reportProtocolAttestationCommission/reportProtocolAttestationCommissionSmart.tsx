import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreReportProtocolAttestationCommission
} from "../../../stores/repots/storeReportProtocolAttestationCommission";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import ReportProtocolAttestationCommission from "./reportProtocolAttestationCommission";


function ReportProtocolAttestationCommissionSmart(props: SmartComponentProps<StoreReportProtocolAttestationCommission>) {

    if (!props.store.isDataSet) {
        return (<ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportRows.length) {
        return (<ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>);
    }

    return (
        <ReportProtocolAttestationCommission store={props.store}/>
    );
}

export default observer(ReportProtocolAttestationCommissionSmart);
