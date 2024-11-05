import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryNMPossibleInjury
} from "../../../../../stores/admin/NMPossibleInjury/storeAdminPageContentDictionaryNMPossibleInjury";
import {StoreComponentDropdownSelect} from "../../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../../stores/common/storeComponentInputText";
import {DropdownSelect} from "../../../../common/dropdownSelect";
import TextEditorMultiline from "../../../../common/textEditorMultiline/textEditorMultiline";
import AdminLabelWithContainerTwoLine from "../../../adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../adminPopupEditor";
import styles from './adminDictionaryNMPossibleInjuryEditorStyle.scss';

const InputEditorPublicName = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});


const DropdownSelectFactory = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {
                props.store.errorText ?
                    <div className={styles.errorText }>{props.store.errorText}</div> :
                    null
            }
        </>
    );
});


function AdminDictionaryNMPossibleInjuryEditor(props: SmartComponentProps<StoreAdminPageContentDictionaryNMPossibleInjury>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.storeEditData.eventCloseEditor}
            eventSaveEditData={props.store.storeEditData.eventSaveEditData}
            popupTitle={props.store.storeEditData.textEditorTitle}
            btnSaveText={props.store.storeEditData.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine label={'Название возможной травмы:'}>
                <InputEditorPublicName store={props.store.storeEditData.storeEditPublicName}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Завод:'}>
                <DropdownSelectFactory store={props.store.storeEditData.storeEditFactory}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
}

export default observer(AdminDictionaryNMPossibleInjuryEditor);
