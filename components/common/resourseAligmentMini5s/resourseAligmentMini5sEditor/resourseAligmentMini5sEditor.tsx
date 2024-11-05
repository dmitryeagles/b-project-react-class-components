import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreEditProjectResourceAlignmentMini5s
} from "../../../../stores/common/pageResourceAlignmentMini5s/storeEditProjectResourceAlignmentMini5s";
import {
    StorePageContentProjectResourceAlignmentMini5s
} from "../../../../stores/common/pageResourceAlignmentMini5s/storePageContentProjectResourceAlignmentMini5s";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminLabelWithContainerTwoLine} from "../../../admin/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {CheckboxButton} from "../../checkboxButton";
import {TextEditorMultiline} from "../../textEditorMultiline";
import styles from './resourseAligmentMini5sEditorStyle.scss';

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


const ResourseAligmentMini5sEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectResourceAlignmentMini5s>) => {
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


function ResourseAligmentMini5sEditor(props: SmartComponentProps<StorePageContentProjectResourceAlignmentMini5s>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ResourseAligmentMini5sEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ResourseAligmentMini5sEditor);
