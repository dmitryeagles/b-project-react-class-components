import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreEditProjectRegistry} from "../../../../stores/common/pageProjectRegistry/storeEditProjectRegistry";
import {
    StorePageContentProjectRegistry
} from "../../../../stores/common/pageProjectRegistry/storePageContentProjectRegistry";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminLabelWithContainerTwoLine} from "../../../admin/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {TextEditorMultiline} from "../../textEditorMultiline";
import styles from './projectRegistryEditorStyle.scss';

const EditorComment = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});


const ProjectRegistryEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectRegistry>) => {
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


function ProjectRegistryEditor(props: SmartComponentProps<StorePageContentProjectRegistry>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ProjectRegistryEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ProjectRegistryEditor);
