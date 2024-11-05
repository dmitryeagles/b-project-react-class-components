import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../../interfaces/smartComponentProps";
import {StoreAdminEditAnswer} from "../../../../../../stores/admin/questionBank/editData/storeAdminEditAnswer";
import {
    StoreComponentSimpleHtmlWysiwygEditor
} from "../../../../../../stores/common/storeComponentSimpleHtmlWysiwygEditor";
import {StoreComponentStandardCheckbox} from "../../../../../../stores/common/storeComponentStandardCheckbox";
import {SimpleHtmlWysiwygEditor} from "../../../../../common/simpleHtmlWysiwygEditor";
import StandardCheckbox from "../../../../../common/standardCheckbox/standardCheckbox";
import EditorContainerAnswerOrQuestion from "../editorContainerAnswerOrQuestion/editorContainerAnswerOrQuestion";
import styles from "./editorAnswerEditModeStyle.scss";

const EditorAnswerHtmlText = observer((props: SmartComponentProps<StoreComponentSimpleHtmlWysiwygEditor>) => {
    return (
        <SimpleHtmlWysiwygEditor
            eventChangeValue={props.store.eventChangeValue}
            valueHtml={props.store.value}
            errorText={props.store.errorText}
        />
    );
});

const EditorAnswerIsCorrect = observer((props: SmartComponentProps<StoreComponentStandardCheckbox>) => {
    return (
        <StandardCheckbox
            className={styles.answerCorrectEditor}
            publicText={'Ответ является верным'}
            isCheck={props.store.isCheck}
            eventCheck={props.store.eventChangeValue}
        />
    );
});

const TEXT_NEW_ANSWER: string = 'Текст нового ответа:';
const TEXT_EDIT_ANSWER: string = 'Редактирование текста ответа:';

/**
 * Редактирование ответа, режим редактирования
 * @param props
 * @constructor
 */
function EditorAnswerEditMode(props: SmartComponentProps<StoreAdminEditAnswer>) {
    return (
        <EditorContainerAnswerOrQuestion
            itemId={props.store.answerUuid}
            editModeEvents={{
                eventCancelEdit: props.store.eventCancelEdit,
                eventSaveEdit: props.store.eventSaveEditData
            }}
        >
            {
                props.store.isNewAnswer ?
                    <div className={`${styles.answerTextLabelNew} ${styles.answerTextLabel}`}>
                        <span>{TEXT_NEW_ANSWER}</span>
                    </div> :
                    <div className={styles.answerTextLabel}>
                        <span>{TEXT_EDIT_ANSWER}</span>
                    </div>
            }
            <EditorAnswerHtmlText store={props.store.storeEditAnswerHtmlText}/>
            <EditorAnswerIsCorrect store={props.store.storeEditAnswerIsCorrect}/>
        </EditorContainerAnswerOrQuestion>
    );
}

export default React.memo(EditorAnswerEditMode);
