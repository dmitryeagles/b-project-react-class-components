import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreEditProjectAdminLEAN} from "../../../../stores/admin/projectAdminLEAN/storeEditProjectAdminLEAN";
import {
    StorePageContentProjectAdminLEAN
} from "../../../../stores/admin/projectAdminLEAN/storePageContentProjectAdminLEAN";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {CheckboxButton} from "../../../common/checkboxButton";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './projectAdminLEANEditorStyle.scss';

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


const ProjectAdminLEANEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectAdminLEAN>) => {
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


function ProjectAdminLEANEditor(props: SmartComponentProps<StorePageContentProjectAdminLEAN>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ProjectAdminLEANEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ProjectAdminLEANEditor);
