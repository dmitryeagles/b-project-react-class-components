import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreComponentDropdownMultiSelect} from "../../../../stores/common/storeComponentDropdownMultiSelect";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {
    StoreShiftManagerEditEmployeeEvaluation
} from "../../../../stores/shiftManager/employeeEvaluation/storeShiftManagerEditEmployeeEvaluation";
import {
    StoreShiftManagerPageContentEmployeeEvaluation
} from "../../../../stores/shiftManager/employeeEvaluation/storeShiftManagerPageContentEmployeeEvaluation";
import AdminLabelWithContainerTwoLine
    from "../../../admin/adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {DropdownMultiSelect} from "../../../common/dropdownMultiSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import styles from "./shiftManagerEmployeeEvaluationEditorStyle.scss";

const InputEditorScore = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            min={props.store.minValue}
            max={props.store.maxValue}
        />
    );
});

const DropdownMultiSelectUser = observer((props: SmartComponentProps<StoreComponentDropdownMultiSelect<string>>) => {
    return (
        <>
            <DropdownMultiSelect
                eventChange={props.store.eventChangeValues}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValues={props.store.selectedValues}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorTextDropDown}>{props.store.errorText}</div> : null}
        </>
    );
});

const PopupEditor = observer((props: SmartComponentProps<StoreShiftManagerEditEmployeeEvaluation>) => {
    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCloseEditor}
            eventSaveEditData={props.store.eventSaveEditData}
            popupTitle={props.store.textEditorTitle}
            btnSaveText={props.store.textSaveBtn}
        >
            {
                props.store.storeEditorUsers ?
                    <AdminLabelWithContainerTwoLine label={'Фио сотрудников:'}>
                        <DropdownMultiSelectUser store={props.store.storeEditorUsers}/>
                    </AdminLabelWithContainerTwoLine> :
                    <div className={styles.editUserFullName}>{props.store.fullNameOfEmployeeAtTimeOfStartEditing}</div>
            }
            <AdminLabelWithContainerTwoLine label={'Значение:'}>
                <InputEditorScore store={props.store.storeEditorScore}/>
            </AdminLabelWithContainerTwoLine>

        </AdminPopupEditor>
    );
});

function ShiftManagerEmployeeEvaluationEditor(props: SmartComponentProps<StoreShiftManagerPageContentEmployeeEvaluation>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <PopupEditor store={props.store.storeEditData}/>
    );
}

export default observer(ShiftManagerEmployeeEvaluationEditor);
