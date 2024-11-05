import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditFeedbackNM} from "../../../../stores/admin/feedbackNM/storeAdminEditFeedbackNM";
import {StoreAdminPageContentFeedbackNM} from "../../../../stores/admin/feedbackNM/storeAdminPageContentFeedbackNM";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {
    StoreSafetySpecialistPageContentFeedbackNM
} from "../../../../stores/safetySpecialist/feedbackNM/storeSafetySpecialistPageContentFeedbackNM";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './adminFeedbackNMEditorStyle.scss';

const EditorComment = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});

const EditorStatus = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </>
    );
});

const AdminFeedbackNMEditorPopup = React.memo((props: SmartComponentProps<StoreAdminEditFeedbackNM>) => {
    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCloseEditor}
            eventSaveEditData={props.store.eventSaveEditData}
            popupTitle={props.store.textEditorTitle}
            btnSaveText={props.store.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine label={'Комментарий:'}>
                <EditorComment store={props.store.storeEditorComment}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Статус:'} isRequired>
                <EditorStatus store={props.store.storeEditorStatus}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
});

function AdminFeedbackNMEditor(props: SmartComponentProps<StoreAdminPageContentFeedbackNM | StoreSafetySpecialistPageContentFeedbackNM>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (<AdminFeedbackNMEditorPopup store={props.store.storeEditData}/>);
}

export default observer(AdminFeedbackNMEditor);
