import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {
    StoreEditProjectResourceManagerLEAN
} from "../../../../stores/resourceApprovingManager/projectResourceApprovingManagerLEAN/storeEditProjectResourceManagerLEAN";
import {
    StorePageContentProjectResourceManagerLEAN
} from "../../../../stores/resourceApprovingManager/projectResourceApprovingManagerLEAN/storePageContentProjectResourceManagerLEAN";
import {AdminLabelWithContainerTwoLine} from "../../../admin/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {CheckboxButton} from "../../../common/checkboxButton";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import styles from './projectLeanResourceManagerEditorStyle.scss';

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


const ProjectLeanResourceManagerEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectResourceManagerLEAN>) => {
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


function ProjectLeanResourceManagerEditor(props: SmartComponentProps<StorePageContentProjectResourceManagerLEAN>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ProjectLeanResourceManagerEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ProjectLeanResourceManagerEditor);
