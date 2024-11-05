import React from "react";
import {
    ReportGeneralResultsWorkByUser,
    ReportGeneralResultsWorkByUserCategory
} from "../../../interfaces/api/reportGeneralResultsWorkByUser";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from './reportGeneralResultsWorkStyle.scss';

//region Категории
interface ReportCategoryProps {
    readonly reportCategoryData: ReportGeneralResultsWorkByUserCategory;
}

function ReportCategory(props: ReportCategoryProps) {

    const categoryRows: JSX.Element[] = [];

    for (let i = 0; i < props.reportCategoryData.categoryData.length; ++i) {
        categoryRows.push(
            <tr key={props.reportCategoryData.categoryData[i].uuid}>
                <td>{props.reportCategoryData.categoryData[i].kpiName}</td>
                <td>{props.reportCategoryData.categoryData[i].targetValue}</td>
                <td>{props.reportCategoryData.categoryData[i].score}</td>
                <td>{props.reportCategoryData.categoryData[i].fact}</td>
                <td>{props.reportCategoryData.categoryData[i].result}</td>
            </tr>
        );
    }

    return (
        <>
            <thead>
                <tr>
                    <th colSpan={5}>{props.reportCategoryData.kpiCategoryName}</th>
                </tr>
                <tr>
                    <th>{'Наименование компетенции'}</th>
                    <th>{'Цель'}</th>
                    <th>{'Вес %'}</th>
                    <th>{'Факт'}</th>
                    <th>{'Результат'}</th>
                </tr>
            </thead>
            <tbody>
                {categoryRows}
                <tr>
                    <td colSpan={4} rowSpan={1}>{`Итого по ${props.reportCategoryData.kpiCategoryName}`}</td>
                    <td>{props.reportCategoryData.scoreByCategory}</td>
                </tr>
            </tbody>
        </>
    );
}

//endregion


//region ReportGeneralResultsWork
interface ReportGeneralResultsWorkProps {
    readonly reportGeneralResultsWorData: ReportGeneralResultsWorkByUser;
    readonly attestationPublicName: string;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

/**
 * Отчет – общий отчет о показателях работы
 * @param props
 * @constructor
 */
function ReportGeneralResultsWork(props: ReportGeneralResultsWorkProps) {

    const categoryList: JSX.Element[] = [];

    for (let i = 0; i < props.reportGeneralResultsWorData.reportData.length; ++i) {
        categoryList.push(
            <ReportCategory
                key={props.reportGeneralResultsWorData.reportData[i].uuid}
                reportCategoryData={props.reportGeneralResultsWorData.reportData[i]}
            />
        );
    }

    return (
        <div>
            <ReportTitle
                reportName={'Общий отчет о показателях работы'}
            />
            <ReportInfoContainer>
                <ReportInfoRow
                    label={'ФИО сотрудника:'}
                    value={props.reportGeneralResultsWorData.userFullName}
                />

                <ReportInfoRow
                    label={'Смена/подразделение:'}
                    value={props.reportGeneralResultsWorData.unitName}
                />
                <ReportInfoRow
                    label={'Аттестация:'}
                    value={props.attestationPublicName}
                />
                <ReportInfoRow
                    label={'Должность:'}
                    value={props.reportGeneralResultsWorData.positionName}
                />
            </ReportInfoContainer>

            <ReportButtonsExport
                exportPDFLink={props.exportPDFLink}
                exportWordLink={props.exportWordLink}
            />

            <div className={styles.tableContainer}>
                <table>
                    {categoryList}
                    <tbody>
                        <tr className={styles.scoreAllRow}>
                            <td colSpan={4} rowSpan={1}>{'Общий итог:'}</td>
                            <td>{props.reportGeneralResultsWorData.scoreAll}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
//endregion

export default React.memo(ReportGeneralResultsWork);
