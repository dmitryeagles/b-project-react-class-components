import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../../../interfaces/smartComponentProps";
import {
    StoreComponentSimpleHtmlWysiwygEditor
} from "../../../../../../stores/common/storeComponentSimpleHtmlWysiwygEditor";
import {SimpleHtmlWysiwygEditor} from "../../../../../common/simpleHtmlWysiwygEditor";
import EditorContainerAnswerOrQuestion from "../editorContainerAnswerOrQuestion/editorContainerAnswerOrQuestion";

const Editor = observer((props: SmartComponentProps<StoreComponentSimpleHtmlWysiwygEditor>) => {
    return (
        <SimpleHtmlWysiwygEditor
            eventChangeValue={props.store.eventChangeValue}
            valueHtml={props.store.value}
            errorText={props.store.errorText}
        />
    );
});

interface EditorQuestionEditModeProps extends SmartComponentProps<StoreComponentSimpleHtmlWysiwygEditor> {
    questionUuid: string;
}

/**
 * Редактирование вопроса теста, режим редактирования
 * @param props
 * @constructor
 */
function EditorQuestionEditMode(props: EditorQuestionEditModeProps) {
    return (
        <EditorContainerAnswerOrQuestion
            itemId={props.questionUuid}
        >
            <Editor store={props.store}/>
        </EditorContainerAnswerOrQuestion>
    );
}

export default React.memo(EditorQuestionEditMode);
