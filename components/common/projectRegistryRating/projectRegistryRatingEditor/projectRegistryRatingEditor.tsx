import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreEditProjectRegistryRating
} from "../../../../stores/common/pageProjectRegistryRating/storeEditProjectRegistryRating";
import {
    StorePageContentProjectRegistryRating
} from "../../../../stores/common/pageProjectRegistryRating/storePageContentProjectRegistryRating";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminLabelWithContainerTwoLine} from "../../../admin/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {TextEditorMultiline} from "../../textEditorMultiline";
import styles from './projectRegistryRatingEditorStyle.scss';

const EditorComment = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    );
});


const ProjectRegistryRatingEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectRegistryRating>) => {
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


function ProjectRegistryRatingEditor(props: SmartComponentProps<StorePageContentProjectRegistryRating>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ProjectRegistryRatingEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ProjectRegistryRatingEditor);
