import React from "react";
import {TestExamResultAnswer} from "../../../../interfaces/api/testExam";
import styles from './studentTestResultAnswerStyle.scss';

interface StudentTestResultAnswerProps {
    readonly answerResult: TestExamResultAnswer;
}

function StudentTestResultAnswer(props: StudentTestResultAnswerProps) {
    const cssClassContainer: string = props.answerResult.isCorrect ? styles.answerTrue : styles.answerFalse;
    const cssClassCheckBoxStatus: string = props.answerResult.isUserAnswer ? `${styles.checkBoxChecked} ${styles.checkBox}` : styles.checkBox;
    const cssClassAnswerHelpText: string= props.answerResult.isCorrect ? styles.answerHelpTextTrue : styles.answerHelpTextFalse;
    const checkBoxTitleText: string = props.answerResult.isUserAnswer ? 'Ответ был выбран' : 'Ответ не был выбран';
    const answerHelpText: string = props.answerResult.isCorrect ? 'Ответ верный' : 'Ответ не верный';

    return (
        <div className={`${cssClassContainer} ${styles.componentContainer}`}>
            <div className={styles.answerContent}>
               <span
                   title={checkBoxTitleText}
                   className={cssClassCheckBoxStatus}
               />
                <div
                    className={styles.answerContentHTML}
                    dangerouslySetInnerHTML={{
                        __html: props.answerResult.answerPublicText
                    }}
                />
            </div>
            <div className={`${styles.answerHelpText} ${cssClassAnswerHelpText}`}>
                {answerHelpText}
            </div>
        </div>
    );
}

export default React.memo(StudentTestResultAnswer);