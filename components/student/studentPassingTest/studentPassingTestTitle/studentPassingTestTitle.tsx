import React from "react";
import styles from './studentPassingTestTitleStyle.scss';

interface StudentPassingTestAnswersTitleProps {
    titleText: string;
    className?: string;
}

function StudentPassingTestTitle(props: StudentPassingTestAnswersTitleProps){
    return(
        <div className={props.className ? `${props.className} ${styles.answersTitle}` : styles.answersTitle}>
            {props.titleText}
        </div>
    );
}

export default React.memo(StudentPassingTestTitle);
