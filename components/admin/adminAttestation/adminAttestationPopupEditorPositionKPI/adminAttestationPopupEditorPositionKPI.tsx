import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminAttestationEditorPositionKPI
} from "../../../../stores/admin/attestation/adminAttestationStoresEditors/storeAdminAttestationEditorPositionKPI";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import AdminLabelWithContainerTwoLine from "../../adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from "./adminAttestationPopupEditorPositionKPIStyle.scss";

const DropdownSelectPositionKPI = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <div>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorTextDropdown }>
                        {props.store.errorText}
                    </div> : null
            }
        </div>
    );
});

const EditorScores = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            max={props.store.maxValue}
            min={props.store.minValue}
            value={props.store.value}
        />
    );
});

function AdminAttestationPopupEditorPositionKPI(props: SmartComponentProps<StoreAdminAttestationEditorPositionKPI>){

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCancelEdit}
            eventSaveEditData={props.store.eventSaveEditedData}
            popupTitle={props.store.isNewItem ? 'Добавить KPI должности' : 'Изменить KPI должности'}
            btnSaveText={props.store.isNewItem ? 'Добавить' : 'Изменить'}
        >
            <AdminLabelWithContainerTwoLine label={'KPI должности:'}>
                <DropdownSelectPositionKPI store={props.store.storeEditorPositionKPI}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Вес:'}>
                <EditorScores store={props.store.storeScore}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Фактическое значение:'}>
                <EditorScores store={props.store.storeCurrentValue}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
}

export default React.memo(AdminAttestationPopupEditorPositionKPI);
