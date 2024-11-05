import React from "react";
import styles from './studentTestExamButtonsNextPrevQuestionStyle.scss';

interface StudentTestExamButtonsNextPrevQuestionProps {
    eventNextQuestion?: () => void;
    eventPrevQuestion?: () => void;
}

function StudentTestExamButtonsNextPrevQuestion(props: StudentTestExamButtonsNextPrevQuestionProps) {
    const cssClassPrevBtn = props.eventPrevQuestion ?
        `${styles.actionButton} ${styles.icoPrevButton}` :
        `${styles.disabledButton} ${styles.icoDisabledButton}`;

    const cssClassNextBtn = props.eventNextQuestion ?
        `${styles.actionButton} ${styles.icoNextButton}` :
        `${styles.disabledButton} ${styles.icoDisabledButton}`;

    return (
        <div className={styles.componentContainer}>
            <button
                className={`${cssClassPrevBtn} ${styles.questionControlButton} ${styles.buttonPrevQuestion}`}
                onClick={props.eventPrevQuestion}
                disabled={!props.eventPrevQuestion}
            >
                {'Предыдущий вопрос'}
            </button>

            <button
                className={`${cssClassNextBtn} ${styles.questionControlButton} ${styles.buttonNextQuestion}`}
                onClick={props.eventNextQuestion}
                disabled={!props.eventNextQuestion}
            >
                {'Следующий вопрос'}
            </button>
        </div>
    );
}

export default React.memo(StudentTestExamButtonsNextPrevQuestion);
