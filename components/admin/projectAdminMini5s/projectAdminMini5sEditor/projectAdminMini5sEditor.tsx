import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreEditProjectAdminMini5s} from "../../../../stores/admin/projectAdminMini5s/storeEditProjectAdminMini5s";
import {
    StorePageContentProjectAdminMini5s
} from "../../../../stores/admin/projectAdminMini5s/storePageContentProjectAdminMini5s";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {CheckboxButton} from "../../../common/checkboxButton";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './projectAdminMini5sEditorStyle.scss';

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


const ProjectAdminMini5sEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectAdminMini5s>) => {
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


function ProjectAdminMini5sEditor(props: SmartComponentProps<StorePageContentProjectAdminMini5s>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ProjectAdminMini5sEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ProjectAdminMini5sEditor);
