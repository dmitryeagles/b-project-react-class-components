import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {ReportDataProjectRegistry} from "../../../interfaces/api/reportDataProjectRegistry";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from "./reportProjectLeanRegistrySmartStyle.scss";

//region ReportProjectLeanRegistry
interface ReportProjectLeanRegistryProps {
    readonly report: ReportDataProjectRegistry;
    readonly projectPublicName?: string;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

function ReportProjectLeanRegistry(props: ReportProjectLeanRegistryProps) {
    return (
        <div>
            <ReportTitle reportName={'Результаты по проекту улучшения:'}/>

            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Проект:'}
                    value={props.report.name}
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
                            <td>{'ФИО сотрудника'}</td>
                            <td>{props.report.authorFIO}</td>
                        </tr>
                        <tr>
                            <td>{'Смена/подразделение'}</td>
                            <td>{props.report.unitPublicName}</td>
                        </tr>
                        <tr>
                            <td>{'Дата начала'}</td>
                            <td>
                                {`${dateFormatForView({
                                    date: props.report.dateCreated,
                                    format: 'DD.MM.YYYY',
                                    defaultValue: '-'
                                })}`}
                            </td>
                        </tr>
                        <tr>
                            <td>{'Завод'}</td>
                            <td>{props.report.factoryPublicName}</td>
                        </tr>
                        <tr>
                            <td>{'Участок/оборудование'}</td>
                            <td>{props.report.equipmentPublicName}</td>
                        </tr>
                        <tr>
                            <td>{'Управляющий менеджер'}</td>
                            <td>{props.report.managerFIO}</td>
                        </tr>
                        <tr>
                            <td>{'Комментарий менеджера по утверждению'}</td>
                            <td>{props.report.commentManager}</td>
                        </tr>
                        <tr>
                            <td>{'Участники'}</td>
                            <td className={styles.participantsList}>{props.report.participantsList.join('\n')}</td>
                        </tr>
                        <tr>
                            <td>{'KPI'}</td>
                            <td>{props.report.KPIName}</td>
                        </tr>
                        <tr>
                            <td>{'Цель проекта'}</td>
                            <td>{props.report.target}</td>
                        </tr>
                        <tr>
                            <td>{'Какую проблему решает'}</td>
                            <td>{props.report.problem}</td>
                        </tr>
                        <tr>
                            <td>{'Описание проекта'}</td>
                            <td>{props.report.descriptionIdea}</td>
                        </tr>
                        <tr>
                            <td>{'Фото до'}</td>
                            <td>
                                {
                                    props.report.photoBefore ?
                                        <div className={styles.photoContainer}>
                                            <img src={props.report.photoBefore} alt={'Фото до'}/>
                                        </div> : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>{'Информация о материалах и ресурсах'}</td>
                            <td>{props.report.resources}</td>
                        </tr>
                        <tr>
                            <td>{'Утверждающий материалы'}</td>
                            <td>{props.report.resourceManagerFIO}</td>
                        </tr>
                        <tr>
                            <td>{'Комментарий менеджера по материалам'}</td>
                            <td>{props.report.commentResourceManager}</td>
                        </tr>
                        <tr>
                            <td>{'Дата внедрения'}</td>
                            <td>
                                {`${dateFormatForView({
                                    date: props.report.integrationDate,
                                    format: 'DD.MM.YYYY',
                                    defaultValue: '-'
                                })}`}
                            </td>
                        </tr>
                        <tr>
                            <td>{'Результат внедрения'}</td>
                            <td>{props.report.integrationResult}</td>
                        </tr>
                        <tr>
                            <td>{'Фото после'}</td>
                            <td>
                                {
                                    props.report.photoResult ?
                                        <div className={styles.photoContainer}>
                                            <img src={props.report.photoResult} alt={'Фото после'}/>
                                        </div> : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>{'Этап'}</td>
                            <td>{props.report.stage}</td>
                        </tr>
                        <tr>
                            <td>{'Оценка'}</td>
                            <td>{props.report.score}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

//endregion

export default React.memo(ReportProjectLeanRegistry);
