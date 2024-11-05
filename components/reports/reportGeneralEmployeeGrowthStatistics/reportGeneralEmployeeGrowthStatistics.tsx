import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {
    ReportDataGeneralEmployeeGrowthStatisticsRow
} from "../../../interfaces/api/reportDataGeneralEmployeeGrowthStatistics";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from "./reportGeneralEmployeeGrowthStatisticsStyle.scss";

//region
interface ReportGeneralEmployeeGrowthStatisticsRowProps {
    readonly reportGeneralEmployeeGrowthStatisticsData: ReportDataGeneralEmployeeGrowthStatisticsRow[];
}

function ReportGeneralEmployeeGrowthStatisticsList(props: ReportGeneralEmployeeGrowthStatisticsRowProps) {

    const reportRows: JSX.Element[] = [];

    for (let i = 0; i < props.reportGeneralEmployeeGrowthStatisticsData.length; ++i) {
        reportRows.push(
            <tr key={props.reportGeneralEmployeeGrowthStatisticsData[i].uuid}>
                <td>{i + 1}</td>
                <td>{props.reportGeneralEmployeeGrowthStatisticsData[i].positionName}</td>
                <td>{props.reportGeneralEmployeeGrowthStatisticsData[i].unitName}</td>
                <td>{props.reportGeneralEmployeeGrowthStatisticsData[i].count}</td>
            </tr>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>{'№'}</th>
                        <th>{'Должность'}</th>
                        <th>{'Подразделение'}</th>
                        <th>{'Количество сотрудников, повысивших уровни'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reportRows}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

//endregion


interface ReportGeneralEmployeeGrowthStatisticsProps {
    readonly reportData: ReportDataGeneralEmployeeGrowthStatisticsRow[];
    readonly factoryPublicName: string;
    readonly dateStart: Date | null
    readonly dateEnd: Date | null;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

/**
 * Отчет – Аттестационный лист
 * @param props
 * @constructor
 */
function ReportGeneralEmployeeGrowthStatistics(props: ReportGeneralEmployeeGrowthStatisticsProps) {
    return (
        <div>
            <ReportTitle
                reportName={'Общая статистика роста сотрудников'}
            />

            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Завод:'}
                    value={props.factoryPublicName}
                />
                <ReportInfoRow
                    label={'Период аттестации:'}
                    value={`${dateFormatForView({
                        date: props.dateStart,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })} - ${dateFormatForView({
                        date: props.dateEnd,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}`}
                />
            </ReportInfoContainer>

            <ReportButtonsExport
                exportPDFLink={props.exportPDFLink}
                exportWordLink={props.exportWordLink}
            />

            <ReportGeneralEmployeeGrowthStatisticsList
                reportGeneralEmployeeGrowthStatisticsData={props.reportData}
            />
        </div>
    );
}

export default React.memo(ReportGeneralEmployeeGrowthStatistics);
