import React from "react";
import {AnswerEditModel} from "../../../../../../interfaces/api/testQuestionEditModel";
import {AnswerOrQuestionTextReadonlyMode} from "../../readonlyMode";
import EditorContainerAnswerOrQuestion, {
    AdminEditTestActionButtonsProps,
} from "../editorContainerAnswerOrQuestion/editorContainerAnswerOrQuestion";
import styles from './editorAnswerReadModeStyle.scss';

const TEXT_ANSWER: string = 'Текст ответа:';
const TEXT_SUCCESS_ANSWER: string = 'Ответ является верным';
const TEXT_ERROR_ANSWER: string = 'Ответ является не верным';

interface EditorAnswerProps extends AdminEditTestActionButtonsProps {
    answer: AnswerEditModel;
}

/**
 * Редактирование ответа, режим чтения
 * @param props
 * @constructor
 */
function EditorAnswerReadMode(props: EditorAnswerProps) {
    return (
        <EditorContainerAnswerOrQuestion{...props}>
            <div className={styles.answerTextLabel}>
                <span>{TEXT_ANSWER}</span>
            </div>
            <div>
                <AnswerOrQuestionTextReadonlyMode htmlText={props.answer.answerText}/>
                {
                    props.answer.isCorrect ?
                        <div className={`${styles.answerStatusReadonly} ${styles.answerStatusReadonlyTrue}`}>
                            {TEXT_SUCCESS_ANSWER}
                        </div> :
                        <div className={`${styles.answerStatusReadonly} ${styles.answerStatusReadonlyFalse}`}>
                            {TEXT_ERROR_ANSWER}
                        </div>
                }
            </div>
        </EditorContainerAnswerOrQuestion>
    );
}

export default React.memo(EditorAnswerReadMode);
