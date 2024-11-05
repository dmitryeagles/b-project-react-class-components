import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryLevel
} from "../../../../../stores/admin/levels/storeAdminPageContentDictionaryLevel";
import {StoreComponentDropdownSelect} from "../../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../../stores/common/storeComponentInputNumber";
import {StoreComponentInputText} from "../../../../../stores/common/storeComponentInputText";
import {DropdownSelect} from "../../../../common/dropdownSelect";
import {InputNumeric} from "../../../../common/inputNumeric";
import {TextEditorMultiline} from "../../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../adminPopupEditor";
import styles from './adminDictionaryLevelsEditorStyle.scss';

const InputEditorPriority = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
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

const InputEditorPublicName = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    )
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

function AdminDictionaryLevelsEditor(props: SmartComponentProps<StoreAdminPageContentDictionaryLevel>){
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
            <AdminLabelWithContainerTwoLine label={'Наименование:'}>
                <InputEditorPublicName store={props.store.storeEditData.storeEditPublicName}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Приоритет:'}>
                <InputEditorPriority store={props.store.storeEditData.storeEditorPriority}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Завод:'}>
                <DropdownSelectFactory store={props.store.storeEditData.storeEditFactory}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
}

export default observer(AdminDictionaryLevelsEditor);
