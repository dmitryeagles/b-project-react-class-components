import {observer} from "mobx-react";
import React from "react";
import {ReportProtocolAttestationCommissionRow} from "../../../interfaces/api/reportDataProtocolAttestationCommission";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreComponentInputText} from "../../../stores/common/storeComponentInputText";
import {
    StoreReportProtocolAttestationCommission
} from "../../../stores/repots/storeReportProtocolAttestationCommission";
import {InputText} from "../../common/inputText";
import ReportButtonsExport from "../reportButtonsExport/reportButtonsExport";
import {ReportInfoContainer} from "../reportInfoContainer";
import {ReportInfoRow} from "../reportInfoRow";
import {ReportTitle} from "../reportTitle";
import styles from "./reportProtocolAttestationCommissionStyle.scss";

interface StartEditCellParams {
    readonly rowId: string;
    readonly cellName: keyof ReportProtocolAttestationCommissionRow;
}

interface CurrentEditableCell extends StartEditCellParams {
    readonly store: StoreComponentInputText;
}

interface ReportRowProps {
    readonly reportRow: ReportProtocolAttestationCommissionRow;
    readonly rowNumber: number;
    readonly eventFinishEdit: () => void;
    readonly eventStartEditCell: (params: StartEditCellParams) => void;
    readonly editableCell?: CurrentEditableCell;
}


const EditorInputText = observer((props: SmartComponentProps<StoreComponentInputText>) =>
    <InputText
        className={styles.inputText}
        value={props.store.value}
        eventChange={props.store.eventChangeValue}
        errorText={props.store.errorText}
        autoFocus={true}
    />
);

interface EditableCellProps {
    readonly editableCell?: CurrentEditableCell;
    readonly eventFinishEdit: () => void;
    readonly eventStartEditCell: (params: StartEditCellParams) => void;
    readonly cellName: keyof ReportProtocolAttestationCommissionRow;
    readonly cellValue: string;
    readonly rowId: string;
}

const EditableCell = React.memo((props: EditableCellProps) => {
    if (props.editableCell) {
        if (props.editableCell.rowId === props.rowId) {
            if (props.editableCell.cellName === 'recommendedTraining'
                || props.editableCell.cellName === 'complianceWithPosition'
                || props.editableCell.cellName === 'presentationForPromotion'
            ) {
                if (props.editableCell.cellName === props.cellName) {
                    return (
                        <td className={styles.editableCell}>
                            <EditorInputText store={props.editableCell.store}/>
                            <div className={styles.editorCellBtnContainer}>
                                <button onClick={props.eventFinishEdit}>{'Сохранить'}</button>
                            </div>
                        </td>
                    );
                }
            }
        }
    }

    return (<td
            className={styles.editableCell}
            onClick={() => props.eventStartEditCell({
                rowId: props.rowId,
                cellName: props.cellName
            })}
        >
            {props.cellValue}
        </td>
    );
});


const ReportRow = React.memo((props: ReportRowProps) => {
    return (
        <tr>
            <td>
                {props.rowNumber}
            </td>

            <td>
                {props.reportRow.userFullName}
            </td>
            <td>
                {props.reportRow.unitName}
            </td>
            <td>
                {props.reportRow.score}
            </td>

                <EditableCell
                    cellName={'recommendedTraining'}
                    rowId={props.reportRow.uuid}
                    cellValue={props.reportRow.recommendedTraining}
                    eventFinishEdit={props.eventFinishEdit}
                    eventStartEditCell={props.eventStartEditCell}
                    editableCell={props.editableCell}
                />
                <EditableCell
                    cellName={'complianceWithPosition'}
                    rowId={props.reportRow.uuid}
                    cellValue={props.reportRow.complianceWithPosition}
                    eventFinishEdit={props.eventFinishEdit}
                    eventStartEditCell={props.eventStartEditCell}
                    editableCell={props.editableCell}
                />
                <EditableCell
                    cellName={'presentationForPromotion'}
                    rowId={props.reportRow.uuid}
                    cellValue={props.reportRow.presentationForPromotion}
                    eventFinishEdit={props.eventFinishEdit}
                    eventStartEditCell={props.eventStartEditCell}
                    editableCell={props.editableCell}
                />
        </tr>
    );
});


const ReportRows = observer((props: SmartComponentProps<StoreReportProtocolAttestationCommission>) => {
    return (
        <tbody>
        {props.store.reportRows.map((row, index) =>
            <ReportRow
                eventStartEditCell={props.store.eventStartEditCell}
                eventFinishEdit={props.store.eventFinishEdit}
                editableCell={props.store.editableCell}
                rowNumber={index + 1}
                reportRow={row}
                key={row.uuid}
            />)}
        </tbody>
    );
});


function ReportProtocolAttestationCommission(props: SmartComponentProps<StoreReportProtocolAttestationCommission>) {

    return (
        <div>
            <ReportTitle
                reportName={'Протокол заседания аттестационной комиссии'}
            />
            <ReportInfoContainer>
                <ReportInfoRow
                    label={'Завод:'}
                    value={props.store.auxiliaryData.factoryName}
                />
                <ReportInfoRow
                    label={'Смена/подразделение:'}
                    value={props.store.auxiliaryData.unitPublicName}
                />
                <ReportInfoRow
                    label={'Аттестация:'}
                    value={props.store.auxiliaryData.attestationPublicName}
                />
            </ReportInfoContainer>

            <ReportButtonsExport
                exportPDFLink={props.store.auxiliaryData.exportPDFLink}
                exportWordLink={props.store.auxiliaryData.exportWordLink}
                eventSaveReport={props.store.eventSaveReport}
            />

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                    <tr>
                        <th>{'№'}</th>
                        <th>{'ФИО сотрудника'}</th>
                        <th>{'Подразделение'}</th>
                        <th>{'Оценка по результатам аттестации'}</th>
                        <th>{'Запланированный проект/обучение'}</th>
                        <th>{'Соответствие занимаемой должности'}</th>
                        <th>{'Представление к поощрению'}</th>
                    </tr>
                    </thead>
                    <ReportRows store={props.store}/>
                </table>
            </div>
        </div>
    );
}

export default observer(ReportProtocolAttestationCommission);
