import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {ReportDataProjectMini5sRegistry} from "../../../interfaces/api/reportDataProjectRegistry";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from "./reportProjectMini5sRegistrySmartStyle.scss";

//region ReportProjectMini5sRegistry
interface ReportProjectMini5sRegistryProps {
    readonly report: ReportDataProjectMini5sRegistry;
    readonly projectPublicName?: string;
    readonly exportPDFLink?: string;
    readonly exportWordLink?: string;
}

function ReportProjectMini5sRegistry(props: ReportProjectMini5sRegistryProps) {

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
                            <td>{'Фото результата'}</td>
                            <td>
                                {
                                    props.report.photoResult ?
                                        <div className={styles.photoContainer}>
                                            <img src={props.report.photoResult} alt={'Фото результата'}/>
                                        </div> : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>{'Фото стандарта'}</td>
                            <td>
                                {
                                    props.report.photoStandart ?
                                        <div className={styles.photoContainer}>
                                            <img src={props.report.photoStandart} alt={'Фото стандарта'}/>
                                        </div> : null
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>{'Этап'}</td>
                            <td>{props.report.stage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

//endregion

export default React.memo(ReportProjectMini5sRegistry);
