import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreReportGeneralEmployeeGrowthStatistics
} from "../../../stores/repots/storeReportGeneralEmployeeGrowthStatistics";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import {ReportGeneralEmployeeGrowthStatistics} from "./index";

function ReportGeneralEmployeeGrowthStatisticsSmart(props: SmartComponentProps<StoreReportGeneralEmployeeGrowthStatistics>) {
    if (!props.store.reportData) {
        return (
            <ReportAnimationEmptyReport publicText={'Отчет не сформирован'}/>);
    }

    if (!props.store.reportData.reportRows.length) {
        return (
            <ReportAnimationEmptyReport publicText={'Нет доступных данных для отображения отчета'}/>
        );
    }

    return (
        <ReportGeneralEmployeeGrowthStatistics
            reportData={props.store.reportData.reportRows}
            factoryPublicName={props.store.reportData.factoryName}
            dateStart={props.store.reportData.dateStart}
            dateEnd={props.store.reportData.dateEnd}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />
    );

}

export default observer(ReportGeneralEmployeeGrowthStatisticsSmart);
