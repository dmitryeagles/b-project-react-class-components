import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryQuestionGroup
} from "../../../../../stores/admin/questionGroup/storeAdminPageContentDictionaryQuestionGroup";
import {StoreComponentInputText} from "../../../../../stores/common/storeComponentInputText";
import TextEditorMultiline from "../../../../common/textEditorMultiline/textEditorMultiline";
import AdminLabelWithContainerTwoLine from "../../../adminLabelWithContainerTwoLine/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../adminPopupEditor";
import styles from './adminDictionaryQuestionGroupEditorStyle.scss';


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

function AdminDictionaryQuestionGroupEditor(props: SmartComponentProps<StoreAdminPageContentDictionaryQuestionGroup>) {
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
            <AdminLabelWithContainerTwoLine label={'Название группы вопросов:'}>
                <InputEditorPublicName store={props.store.storeEditData.storeEditPublicName}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
}

export default observer(AdminDictionaryQuestionGroupEditor);
