import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {ITEMS_FIELDS_REQUIRED_TEMPLATE_SEV} from "../../../../staticData/itemsTemplateSEV";
import {StoreAdminEditFeedbackSEV} from "../../../../stores/admin/feedbackSEV/storeAdminEditFeedbackSEV";
import {StoreAdminPageContentFeedbackSEV} from "../../../../stores/admin/feedbackSEV/storeAdminPageContentFeedbackSEV";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {
    StoreSafetySpecialistPageContentFeedbackSEV
} from "../../../../stores/safetySpecialist/feedbackSEV/storeSafetySpecialistPageContentFeedbackSEV";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './adminFeedbackSEVEditorStyle.scss';

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

const AdminFeedbackSEVEditorPopup = React.memo((props: SmartComponentProps<StoreAdminEditFeedbackSEV>) => {
    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCloseEditor}
            eventSaveEditData={props.store.eventSaveEditData}
            popupTitle={props.store.textEditorTitle}
            btnSaveText={props.store.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine label={'Комментарий:'}
                                            isRequired={ITEMS_FIELDS_REQUIRED_TEMPLATE_SEV['comment'].isRequired}>
                <EditorComment store={props.store.storeEditorComment}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Статус:'} isRequired>
                <EditorStatus store={props.store.storeEditorStatus}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
});

function AdminFeedbackSEVEditor(props: SmartComponentProps<StoreAdminPageContentFeedbackSEV | StoreSafetySpecialistPageContentFeedbackSEV>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (<AdminFeedbackSEVEditorPopup store={props.store.storeEditData}/>);
}

export default observer(AdminFeedbackSEVEditor);
