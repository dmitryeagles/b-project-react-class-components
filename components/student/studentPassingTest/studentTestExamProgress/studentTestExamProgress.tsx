import React from "react";
import styles from './studentTestExamProgressStyle.scss';

interface StudentTestExamProgressProps {
    progressPercent: number;
    currentQuestionNumber: number;
    totalQuestionsNumber: number;
}

function StudentTestExamProgress(props: StudentTestExamProgressProps) {

    let progressPercent = 0;

    if(props.progressPercent > 0){
        if(props.progressPercent > 100){
            progressPercent = 100;
        } else {
            progressPercent = props.progressPercent;
        }
    }

    return (
        <div>
            <div className={styles.questionNumberProgressContainer}>
                {`Вопрос ${props.currentQuestionNumber} из ${props.totalQuestionsNumber}`}
            </div>
            <div className={styles.progressBarContainer}>
                <div
                    className={styles.progressBar}
                    style={{
                        width: `${progressPercent}%`
                    }}
                />
            </div>
        </div>
    );
}

export default React.memo(StudentTestExamProgress);
