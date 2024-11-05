import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminEditCreateNews} from "../../../../stores/admin/createNews/storeAdminEditCreateNews";
import {StoreAdminPageContentCreateNews} from "../../../../stores/admin/createNews/storeAdminPageContentCreateNews";
import {StoreComponentInputText} from "../../../../stores/common/storeComponentInputText";
import {StoreComponentSimpleHtmlWysiwygEditor} from "../../../../stores/common/storeComponentSimpleHtmlWysiwygEditor";
import {StoreComponentStandardCheckbox} from "../../../../stores/common/storeComponentStandardCheckbox";
import {StoreSelectedFile} from "../../../../stores/common/storeSelectedFile";
import {CheckboxButton} from "../../../common/checkboxButton";
import {FileSelection} from "../../../common/fileSelection";
import {InputText} from "../../../common/inputText";
import {SimpleHtmlWysiwygEditor} from "../../../common/simpleHtmlWysiwygEditor";
import {TextEditorMultiline} from "../../../common/textEditorMultiline";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {AdminPopupEditor} from "../../adminPopupEditor";
import styles from "./adminNewsEditorStyle.scss";

const EditorNewsTitle = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <InputText
            className={styles.inputText}
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            placeholder={props.store.placeholder}
        />
    );
});

const EditorNewsDetailText = observer((props: SmartComponentProps<StoreComponentSimpleHtmlWysiwygEditor>) => {
    return (
        <SimpleHtmlWysiwygEditor
            valueHtml={props.store.value}
            errorText={props.store.errorText}
            eventChangeValue={props.store.eventChangeValue}
        />
    );
});

const EditorNewsPreviewText = observer((props: SmartComponentProps<StoreComponentInputText>) => {
    return (
        <TextEditorMultiline
            value={props.store.value}
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
        />
    )
});

const EditorIsNewsActive = observer((props: SmartComponentProps<StoreComponentStandardCheckbox>) => {
    return (
        <CheckboxButton
            publicText={props.store.isCheck ?
                'Новость является активной и будет показана в списке новостей сотрудника'
                : 'Новость является архивной и не будет показана в списке новостей сотрудника'
            }
            isChecked={props.store.isCheck}
            eventCheck={props.store.eventChangeValue}
        />
    );
});

const EditorFile = observer((props: SmartComponentProps<StoreSelectedFile>) => {

    let warningText: string | undefined = undefined;

    if (props.store.currentFileStatus === 'needRemoved' && !props.store.selectedFile) {
        warningText = 'Внимание! Текущий загруженный файл будет удален. Новость не будет иметь вложенного файла';
    } else {
        if (props.store.selectedFile && (props.store.currentFileStatus === 'selected' || props.store.currentFileStatus === 'needRemoved')) {
            warningText = 'Внимание! Текущий загруженный файл будет заменен выбранным';
        }
    }

    return (
        <div>
            <FileSelection
                removeCurrentFileStatus={
                    props.store.currentFileStatus === 'selected' ? 'canDelete' :
                        props.store.currentFileStatus === 'needRemoved' ? 'undoDeletion' : undefined
                }
                textFileNotSelected={
                    (props.store.currentFileStatus === 'selected' || props.store.currentFileStatus === 'needRemoved') ?
                        'Заменить существующий файл' :
                        'Файл не выбран, выбрать файл'
                }
                acceptFileType={'.pdf'}
                eventResetSelectedFile={props.store.eventResetSelectedFile}
                eventToggleStatusNeedRemovedCurrentFile={props.store.eventToggleStatusNeedRemovedCurrentFile}
                selectedFile={props.store.selectedFile}
                eventSelectedFile={props.store.eventSelectedFile}
                errorText={props.store.errorText}
            />

            {warningText ? <div className={styles.warningTextContainer}>{warningText}</div> : null}
        </div>
    );
});

const PopupEditor = observer((props: SmartComponentProps<StoreAdminEditCreateNews>) => {
    return (
        <AdminPopupEditor
            className={styles.popupBodySize}
            eventCloseEditor={props.store.eventCloseEditor}
            eventSaveEditData={props.store.eventSaveEditData}
            popupTitle={props.store.textEditorTitle}
            btnSaveText={props.store.textSaveBtn}
        >
            <AdminLabelWithContainerTwoLine
                label={'Заголовок новости:'}
                helpText={'Заголовок должен быть в интервале 3-70 символов'}
                isRequired={true}
            >
                <EditorNewsTitle store={props.store.storeEditorNewsTitle}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Текст превью новости:'}
                isRequired={true}
                helpText={'Краткое описание новости 10-255 символов'}
            >
                <EditorNewsPreviewText store={props.store.storeEditorPreviewText}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Текст новости:'}
                isRequired={true}
            >
                <EditorNewsDetailText store={props.store.storeEditorDetailText}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine
                label={'Новость активна:'}
                isRequired={true}
            >
                <EditorIsNewsActive store={props.store.storeEditorIsActive}/>
            </AdminLabelWithContainerTwoLine>

            <AdminLabelWithContainerTwoLine label={'Файл:'}>
                <EditorFile store={props.store.storeSelectedFile}/>
            </AdminLabelWithContainerTwoLine>
        </AdminPopupEditor>
    );
});

function AdminNewsEditor(props: SmartComponentProps<StoreAdminPageContentCreateNews>) {
    if (!props.store.storeEditData) {
        return null;
    }

    return (
        <PopupEditor store={props.store.storeEditData}/>
    );
}

export default observer(AdminNewsEditor);
