import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {ReportDataEmployeeGrowthStatisticsRow} from "../../../interfaces/api/reportDataEmployeeGrowthStatistics";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from "./reportEmployeeGrowthStatisticsStyle.scss";

//region
interface ReportEmployeeGrowthStatisticsRowProps {
    readonly reportEmployeeGrowthStatisticsData: ReportDataEmployeeGrowthStatisticsRow[];
}

function ReportEmployeeGrowthStatisticsList(props: ReportEmployeeGrowthStatisticsRowProps) {
    const reportRows: JSX.Element[] = [];

    for (let i = 0; i < props.reportEmployeeGrowthStatisticsData.length; ++i) {
        reportRows.push(
            <tr key={props.reportEmployeeGrowthStatisticsData[i].uuid}>
                <td>{i + 1}</td>
                <td>{props.reportEmployeeGrowthStatisticsData[i].userFullName}</td>
                <td>{props.reportEmployeeGrowthStatisticsData[i].positionName}</td>
                <td>{props.reportEmployeeGrowthStatisticsData[i].unitName}</td>
                <td>{props.reportEmployeeGrowthStatisticsData[i].currentLevelName}</td>
                <td>{props.reportEmployeeGrowthStatisticsData[i].prevLevelName}</td>
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
                            <th>{'ФИО сотрудника'}</th>
                            <th>{'Должность'}</th>
                            <th>{'Подразделение'}</th>
                            <th>{'Текущий уровень'}</th>
                            <th>{'Уровень сотрудника в прошлом периоде'}</th>
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

interface ReportEmployeeGrowthStatisticsProps {
    readonly reportData: ReportDataEmployeeGrowthStatisticsRow[];
    readonly factoryPublicName: string;
    readonly positionPublicName: string;
    readonly unitPublicName: string;
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
function ReportEmployeeGrowthStatistics(props: ReportEmployeeGrowthStatisticsProps) {
    return (
        <div>
            <ReportTitle
                reportName={'Статистика роста сотрудников'}
            />

            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Завод:'}
                    value={props.factoryPublicName}
                />
                <ReportInfoRow
                    label={'Должность:'}
                    value={props.positionPublicName}
                />
                <ReportInfoRow
                    label={'Подразделение:'}
                    value={props.unitPublicName}
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
            <ReportEmployeeGrowthStatisticsList
                reportEmployeeGrowthStatisticsData={props.reportData}
            />
        </div>
    );
}

export default React.memo(ReportEmployeeGrowthStatistics);
