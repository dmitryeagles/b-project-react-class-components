import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import ErrorSVGIco from '../../../img/svg_component/error.svg'
import SuccessSVGIco from '../../../img/svg_component/success.svg';
import {ReportAssignedResultsByUser} from "../../../interfaces/api/reportAssignedResultsByUser";
import {
    ReportFinalTestingResultsByUserData,
    ReportFinalTestingResultsUserAnswer
} from "../../../interfaces/api/reportFinalTestingResultsByUser";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from './reportAssignedResultsStyle.scss';

//region UserAnswers
interface UserAnswersProps {
    readonly userAnswers: ReportFinalTestingResultsUserAnswer[];
}

const UserAnswers = React.memo((props: UserAnswersProps) => {

    if (!props.userAnswers.length) {
        return (<div>{'-'}</div>);
    }

    const userAnswersElementsList: JSX.Element[] = [];

    for (let i = 0; i < props.userAnswers.length; ++i) {
        const cssClass: string = (i === 0) ? `${styles.userAnswerFirst} ${styles.answerContentHTML}` : `${styles.userAnswer} ${styles.answerContentHTML}`;
        userAnswersElementsList.push(
            <div
                className={cssClass}
                key={props.userAnswers[i].uuid}
                dangerouslySetInnerHTML={{__html: props.userAnswers[i].answerText}}
            />
        );
    }

    return (
        <div>
            {userAnswersElementsList}
        </div>
    );
});
//endregion

//region TableRows
interface TableRowProps {
    readonly rowData: ReportFinalTestingResultsByUserData;
}

const TableRow = React.memo((props: TableRowProps) => {
    return (
        <tr>
            <td
                className={styles.questionContentHtml}
                dangerouslySetInnerHTML={{__html: props.rowData.questionText}}
            />
            <td>{<UserAnswers userAnswers={props.rowData.userAnswers}/>}</td>
            <td className={`${styles.cellStatus} ${props.rowData.isDone ? styles.cellStatusSuccess : styles.cellStatusError}`}>
                {props.rowData.isDone ? <SuccessSVGIco/> : <ErrorSVGIco/>}
            </td>
        </tr>
    );
});
//endregion

//region ReportAssignedResults
interface ReportFinalTestingResultsProps {
    readonly report: ReportAssignedResultsByUser;
    readonly testPublicName: string;
    readonly attestationPublicName?: string;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

function ReportAssignedResults(props: ReportFinalTestingResultsProps) {

    const rowsList: JSX.Element[] = [];

    for (let i = 0; i < props.report.reportData.length; ++i) {
        rowsList.push(
            <TableRow
                rowData={props.report.reportData[i]}
                key={props.report.reportData[i].uuid}
            />
        );
    }

    return (
        <div>
            <ReportTitle reportName={'Результаты финального тестирования:'}/>

            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Тест:'}
                    value={props.report.testName}
                />

                {
                    props.attestationPublicName ? <ReportInfoRow
                        label={'Аттестация:'}
                        value={props.attestationPublicName}
                    /> : null
                }

                <ReportInfoRow
                    label={'ФИО сотрудника:'}
                    value={props.report.userFullName}
                />

                <ReportInfoRow
                    label={'Смена/подразделение:'}
                    value={props.report.unitName}
                />

                <ReportInfoRow
                    label={'Должность:'}
                    value={props.report.positionName}
                />

                <ReportInfoRow
                    label={'Правильные ответы:'}
                    value={props.report.rightAnswers}
                />

                <ReportInfoRow
                    label={'Процент правильных ответов:'}
                    value={props.report.rightAnswersPercent}
                />

                <ReportInfoRow
                    label={'Количество набранных баллов:'}
                    value={props.report.scoreCount}
                />

                <ReportInfoRow
                    label={'Проходной балл:'}
                    value={props.report.passingScore}
                />

                <ReportInfoRow
                    label={'Дата прохождения:'}
                    value={`${dateFormatForView({
                        date: props.report.dateStart,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })} - ${dateFormatForView({
                        date: props.report.dateEnd,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}`}
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
                        <th>{'Текст вопроса'}</th>
                        <th>{'Ответы'}</th>
                        <th>{'Результат'}</th>
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

//endregion

export default React.memo(ReportAssignedResults);
