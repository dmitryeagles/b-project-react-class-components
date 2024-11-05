import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminAttestationEditorLevels
} from "../../../../stores/admin/attestation/adminAttestationStoresEditors/storeAdminAttestationEditorLevels";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import AdminLabelWithContainerTwoLine from "../../adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from "./adminAttestationPopupEditorLevelStyle.scss";

const DropdownSelectLevel = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
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

function AdminAttestationPopupEditorLevel(props: SmartComponentProps<StoreAdminAttestationEditorLevels>){

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCancelEdit}
            eventSaveEditData={props.store.eventSaveEditedData}
            popupTitle={props.store.isNewItem ? 'Добавить уровень' : 'Изменить уровень'}
            btnSaveText={props.store.isNewItem ? 'Добавить' : 'Изменить'}
        >
            <AdminLabelWithContainerTwoLine label={'Уровень:'}>
                <DropdownSelectLevel store={props.store.storeEditorLevel}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Баллы минимум:'}>
                <EditorScores store={props.store.storeLowerScore}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Баллы максимум:'}>
                <EditorScores store={props.store.storeUpperScore}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
}

export default React.memo(AdminAttestationPopupEditorLevel);
