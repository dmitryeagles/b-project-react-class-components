import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreReportEmployeeGrowthStatistics} from "../../../stores/repots/storeReportEmployeeGrowthStatistics";
import {ReportAnimationEmptyReport} from "../reportAnimationEmptyReport";
import {ReportEmployeeGrowthStatistics} from "./index";

function ReportEmployeeGrowthStatisticsSmart(props: SmartComponentProps<StoreReportEmployeeGrowthStatistics>) {
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
        <ReportEmployeeGrowthStatistics
            reportData={props.store.reportData.reportRows}
            factoryPublicName={props.store.reportData.factoryName}
            positionPublicName={props.store.reportData.positionName}
            unitPublicName={props.store.reportData.unitName}
            dateStart={props.store.reportData.dateStart}
            dateEnd={props.store.reportData.dateEnd}
            exportPDFLink={props.store.reportData.exportPDFLink}
            exportWordLink={props.store.reportData.exportWordLink}
        />
    );

}

export default observer(ReportEmployeeGrowthStatisticsSmart);
