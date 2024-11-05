import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {
    ReportAttestationSheetByUser,
    ReportAttestationSheetByUserData
} from "../../../interfaces/api/reportAttestationSheetByUser";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from './reportAttestationSheetStyle.scss';

//region TableScore
interface TableScoreProps {
    readonly reportData: ReportAttestationSheetByUserData[];
    readonly scoreAll: string;
}

function TableScore(props: TableScoreProps) {
    const tableScoreContent: JSX.Element[] = [];

    for (let i = 0; i < props.reportData.length; ++i) {
        tableScoreContent.push(
            <tr key={props.reportData[i].uuid}>
                <td className={styles.columnNumber}>{i + 1}</td>
                <td>{props.reportData[i].kpiCategoryName}</td>
                <td className={styles.columnScore}>{props.reportData[i].score}</td>
            </tr>
        );
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.tableScore}>
                <thead>
                <tr>
                    <th className={styles.columnNumber}>{'№'}</th>
                    <th>{'Показатели аттестации'}</th>
                    <th className={styles.columnScore}>{'Балл'}</th>
                </tr>
                </thead>
                <tbody>
                {tableScoreContent}
                <tr>
                    <td className={styles.sumScore} colSpan={2}>{'ИТОГО:'}</td>
                    <td>{props.scoreAll}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

//endregion

interface ReportAttestationListProps {
    readonly reportData: ReportAttestationSheetByUser;
    readonly attestationPublicName: string;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

/**
 * Отчет – Аттестационный лист
 * @param props
 * @constructor
 */
function ReportAttestationSheet(props: ReportAttestationListProps) {
    return (
        <div>
            <ReportTitle
                reportName={'Аттестационный лист'}
            />
            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Аттестация:'}
                    value={props.attestationPublicName}
                />
            </ReportInfoContainer>
            <ReportButtonsExport
                exportPDFLink={props.exportPDFLink}
                exportWordLink={props.exportWordLink}
            />
            <div className={styles.tableContainer}>
                <table>
                    <tbody>
                    <tr>
                        <td>{'1. ФИО сотрудника'}</td>
                        <td>{props.reportData.userFullName}</td>
                    </tr>
                    <tr>
                        <td>{'2. Подразделение'}</td>
                        <td>{props.reportData.unitName}</td>
                    </tr>
                    <tr>
                        <td>{'3. Должность'}</td>
                        <td>{props.reportData.positionName}</td>
                    </tr>
                    <tr>
                        <td>{'4. Стаж работы (лет)'}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{'5. Обучение (курсы), прошедшие за аттестационный период'}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{'6. Какие награды (поощрения) имеет за аттестационный период'}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{'7. Имеет ли взыскания за аттестационный период'}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{'8. Аттестуется за период'}</td>
                        <td>{`${dateFormatForView({
                            date: props.reportData.dateStart,
                            format: 'DD.MM.YYYY',
                            defaultValue: '-'
                        })} - ${dateFormatForView({
                            date: props.reportData.dateEnd,
                            format: 'DD.MM.YYYY',
                            defaultValue: '-'
                        })}`}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {
                props.reportData.reportData.length ?
                    <TableScore
                        scoreAll={props.reportData.scoreAll}
                        reportData={props.reportData.reportData}
                    /> :
                    null
            }
        </div>
    );

}

export default React.memo(ReportAttestationSheet);
