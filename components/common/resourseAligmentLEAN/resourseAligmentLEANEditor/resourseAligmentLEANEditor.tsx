import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreEditProjectResourceAlignmentLEAN
} from "../../../../stores/common/pageResourceAlignmentLEAN/storeEditProjectResourceAlignmentLEAN";
import {
    StorePageContentProjectResourceAlignmentLEAN
} from "../../../../stores/common/pageResourceAlignmentLEAN/storePageContentProjectResourceAlignmentLEAN";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {AdminLabelWithContainerTwoLine} from "../../../admin/adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../../admin/adminPopupEditor";
import {CheckboxButton} from "../../checkboxButton";
import {TextEditorMultiline} from "../../textEditorMultiline";
import styles from './resourseAligmentLEANEditorStyle.scss';

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


const ResourseAligmentLEANEditorPopup = React.memo((props: SmartComponentProps<StoreEditProjectResourceAlignmentLEAN>) => {
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


function ResourseAligmentLEANEditor(props: SmartComponentProps<StorePageContentProjectResourceAlignmentLEAN>) {
    if(!props.store.storeEditData) {
        return null;
    }

    return (<ResourseAligmentLEANEditorPopup store={props.store.storeEditData}/>);
}

export default observer(ResourseAligmentLEANEditor);
