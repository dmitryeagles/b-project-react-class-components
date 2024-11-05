import React from "react";
import {ReportDataEmployeeLevels, ReportDataEmployeeLevelsRow} from "../../../interfaces/api/reportDataEmployeeLevels";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from "./reportEmployeeLevelsStyle.scss";

interface ReportRowProps {
    readonly reportRow: ReportDataEmployeeLevelsRow;
    readonly rowNumber: number;
}

function ReportRow(props: ReportRowProps) {
    return (
        <tr>
            <td>
                {props.rowNumber}
            </td>

            <td>
                {props.reportRow.userFullName}
            </td>
            <td>
                {props.reportRow.positionName}
            </td>
            <td>
                {props.reportRow.unitName}
            </td>
            <td>
                {props.reportRow.currentLevelName}
            </td>
            <td>
                {props.reportRow.claimedLevelName}
            </td>
            <td/>
        </tr>
    );
}

interface ReportProtocolAttestationCommissionProps {
    readonly report: ReportDataEmployeeLevels;
    readonly attestationPublicName: string;
    readonly unitPublicName: string;
    readonly positionPublicName: string;
    readonly factoryPublicName: string;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

function ReportEmployeeLevels(props: ReportProtocolAttestationCommissionProps) {

    const rowsList: JSX.Element[] = [];

    for (let i = 0; i < props.report.reportRows.length; ++i) {
        rowsList.push(
            <ReportRow
                rowNumber={i + 1}
                reportRow={props.report.reportRows[i]}
                key={props.report.reportRows[i].uuid}
            />
        );
    }

    return (
        <div>
            <ReportTitle
                reportName={'Уровни сотрудников'}
            />
            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Смена/подразделение:'}
                    value={props.unitPublicName}
                />
                <ReportInfoRow
                    label={'Аттестация:'}
                    value={props.attestationPublicName}
                />
                <ReportInfoRow
                    label={'Должность:'}
                    value={props.positionPublicName}
                />
                <ReportInfoRow
                    label={'Завод:'}
                    value={props.factoryPublicName}
                />
            </ReportInfoContainer>

            <ReportButtonsExport
                exportPDFLink={props.exportPDFLink}
                exportWordLink={props.exportWordLink}
            />
            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>{'№'}</th>
                        <th>{'ФИО сотрудника'}</th>
                        <th>{'Должность'}</th>
                        <th>{'Подразделение'}</th>
                        <th>{'Текущий уровень'}</th>
                        <th>{'Претендуемый уровень'}</th>
                        <th>{'Результат финального тестирования'}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rowsList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default React.memo(ReportEmployeeLevels);
