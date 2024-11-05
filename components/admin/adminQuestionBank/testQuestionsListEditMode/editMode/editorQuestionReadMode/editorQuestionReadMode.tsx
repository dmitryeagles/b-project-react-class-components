import React from "react";
import AnswerOrQuestionTextReadonlyMode
    from "../../readonlyMode/answerOrQuestionTextReadonlyMode/answerOrQuestionTextReadonlyMode";
import EditorContainerAnswerOrQuestion, {
    AdminEditTestActionsButtonsReadModeProps
} from "../editorContainerAnswerOrQuestion/editorContainerAnswerOrQuestion";

interface EditorQuestionReadModeProps extends AdminEditTestActionsButtonsReadModeProps {
    questionTextHtml: string;
}

/**
 * Редактирование текста вопроса, режим чтения
 * @param props
 * @constructor
 */
function EditorQuestionReadMode(props: EditorQuestionReadModeProps){
    return (
        <EditorContainerAnswerOrQuestion
            eventDeleteItem={props.eventDeleteItem}
            eventStartEdit={props.eventStartEdit}
            itemId={props.itemId}
        >
            <AnswerOrQuestionTextReadonlyMode
                htmlText={props.questionTextHtml}
                placeholder={'Текст вопроса пуст'}
            />
        </EditorContainerAnswerOrQuestion>
    );
}

export default React.memo(EditorQuestionReadMode);
