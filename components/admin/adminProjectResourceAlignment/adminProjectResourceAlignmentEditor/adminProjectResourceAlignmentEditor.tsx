import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreEditProjectAdminResourceAlignment
} from "../../../../stores/admin/projectAdminResourceAlignment/storeEditProjectAdminResourceAlignment";
import {
    StorePageContentProjectAdminResourceAlignment
} from "../../../../stores/admin/projectAdminResourceAlignment/storePageContentProjectAdminResourceAlignment";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {CheckboxButton} from "../../../common/checkboxButton";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './adminProjectResourceAlignmentEditorStyle.scss';

const EditorComment = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});

const CheckByAttestation = observer((props: SmartComponentProps<StoreBooleanFlag>) =>
    <CheckboxButton
        publicText={'Согласовано'}
        isChecked={props.store.status}
        eventCheck={props.store.toggleStatus}
    />
);


const AdminProjectResourceAlignmentEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectAdminResourceAlignment>) => {
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

            <div>
                <CheckByAttestation store={props.store.storeIsConfirmed}/>
            </div>
        </AdminPopupEditor>
    );
});


function AdminProjectResourceAlignmentEditor(props: SmartComponentProps<StorePageContentProjectAdminResourceAlignment>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<AdminProjectResourceAlignmentEditorPopup store={props.store.storeEditData}/>);
}

export default observer(AdminProjectResourceAlignmentEditor);
