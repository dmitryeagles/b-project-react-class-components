import React from "react";
import StandardPanel from "../../../common/standardPanel/standardPanel";
import styles from './studentPassingTestExamQuestionStyle.scss';

interface StudentTestExamQuestionProps {
    readonly questionText: string;
}

function StudentPassingTestExamQuestion(props: StudentTestExamQuestionProps){
    return(
        <StandardPanel>
            <div
                className={styles.questionContentHTML}
                dangerouslySetInnerHTML={{__html: props.questionText}}
            />
        </StandardPanel>
    );
}

export default React.memo(StudentPassingTestExamQuestion);
