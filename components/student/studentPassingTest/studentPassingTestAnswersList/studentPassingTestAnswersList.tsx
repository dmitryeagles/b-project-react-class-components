import {observer} from "mobx-react";
import React from "react";
import {TestExamAnswer} from "../../../../interfaces/api/testExam";
import {StoreTestExamAnswers} from "../../../../stores/passingExamTest/storeTestExamAnswers";
import StandardPanel from "../../../common/standardPanel/standardPanel";
import styles from './studentPassingTestAnswersListStyle.scss';

interface StudentPassingTestAnswerBaseProps {
    readonly storeAnswersStatus: StoreTestExamAnswers;
}

interface UserAnswerStatusProps extends StudentPassingTestAnswerBaseProps{
    readonly answerUuid: string;
    readonly isMultiSelectAnswers: boolean;
}

const UserAnswerStatus = observer((props: UserAnswerStatusProps)=>{
    const isAnswerSelected = props.storeAnswersStatus.checkIfAnswerIsSelected(props.answerUuid);
    const isMultiSelectAnswers = props.isMultiSelectAnswers;
    const cssClassEditorType:string = isMultiSelectAnswers ? styles.checkBox : styles.radioButton;
    const cssClassCommon: string = `${cssClassEditorType} ${styles.userAnswerStatus}`;

    return(
        <span
            data-id={props.answerUuid}
            className={isAnswerSelected ? `${cssClassCommon} ${styles.userAnswerStatusChecked}` : cssClassCommon}
            onClick={props.storeAnswersStatus.eventToggleAnswer}
        />
    );
})


interface StudentPassingTestAnswerProps extends StudentPassingTestAnswerBaseProps{
    readonly answers: TestExamAnswer;
    readonly isMultiSelectAnswers: boolean;
}

function StudentPassingTestAnswer(props: StudentPassingTestAnswerProps) {
    return (
        <StandardPanel className={styles.answerContainer}>
            <div className={styles.contentContainer}>
                <UserAnswerStatus
                    answerUuid={props.answers.uuid}
                    storeAnswersStatus={props.storeAnswersStatus}
                    isMultiSelectAnswers={props.isMultiSelectAnswers}
                />
                <div
                    className={styles.answerContentHTML}
                    dangerouslySetInnerHTML={{__html: props.answers.answerText}}
                />
            </div>
        </StandardPanel>
    );
}


interface StudentPassingTestAnswersListProps extends StudentPassingTestAnswerBaseProps {
    answersList: TestExamAnswer[];
    readonly isMultiSelectAnswers: boolean;
}

function StudentPassingTestAnswersList(props: StudentPassingTestAnswersListProps) {
    const answersList: JSX.Element[] = [];

    for (let i = 0; i < props.answersList.length; ++i) {
        answersList.push(
            <StudentPassingTestAnswer
                key={props.answersList[i].uuid}
                storeAnswersStatus={props.storeAnswersStatus}
                answers={props.answersList[i]}
                isMultiSelectAnswers={props.isMultiSelectAnswers}
            />
        );
    }

    return (
        <div>
            {answersList}
        </div>
    );
}


export default React.memo(StudentPassingTestAnswersList);
