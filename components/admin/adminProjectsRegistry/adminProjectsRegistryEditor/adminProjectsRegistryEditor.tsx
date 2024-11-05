import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreEditProjectsAdminRegistry
} from "../../../../stores/admin/projectsAdminRegistry/storeEditProjectsAdminRegistry";
import {
    StorePageContentProjectsAdminRegistry
} from "../../../../stores/admin/projectsAdminRegistry/storePageContentProjectsAdminRegistry";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from './adminProjectsRegistryEditorStyle.scss';

const EditorComment = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});



const AdminProjectsRegistryEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectsAdminRegistry>) => {
    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCloseEditor}
            eventSaveEditData={props.store.eventSaveEditData}
            popupTitle={props.store.textEditorTitle}
            btnSaveText={props.store.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine label={'Комментарий:'} isRequired>
                <EditorComment store={props.store.storeEditorComment}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
});


function AdminProjectsRegistryEditor(props: SmartComponentProps<StorePageContentProjectsAdminRegistry>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<AdminProjectsRegistryEditorPopup store={props.store.storeEditData}/>);
}

export default observer(AdminProjectsRegistryEditor);
