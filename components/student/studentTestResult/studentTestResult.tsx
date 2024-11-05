import React from "react";
import {numberRounding} from "../../../helpers/numberRounding";
import {TestExamResultQuestion} from "../../../interfaces/api/testExam";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreTestExamResult} from "../../../stores/passingExamTest/storeTestExamResult";
import {LinkAsButton} from "../../common/linkAsButton";
import {StudentTestResultQuestion} from "./studentTestResultQuestion";
import styles from './studentTestResultStyle.scss';

interface QuestionsListProps {
    readonly resultQuestionsList: TestExamResultQuestion[];
}

const QuestionsList = React.memo((props: QuestionsListProps) => {
    const questionsElements: JSX.Element[] = [];

    for (let i = 0; i < props.resultQuestionsList.length; ++i) {
        questionsElements.push(
            <StudentTestResultQuestion
                key={props.resultQuestionsList[i].uuid}
                questionResult={props.resultQuestionsList[i]}
            />
        );
    }

    return (
        <div>
            {questionsElements}
        </div>
    );
});

interface TestResultScoreProps {
    readonly isPointsInPercent: boolean;
    readonly examTestResultScore: number;
}

const TestResultScore = React.memo((props: TestResultScoreProps) => {
    let scoreResult: number = 0;
    if (typeof props.examTestResultScore === 'number') {
        if (props.examTestResultScore > 0) {
            scoreResult = numberRounding(props.examTestResultScore, 2);
        }
    }

    return (
        <span className={styles.numberOfPoints}>
            {props.isPointsInPercent ? `${scoreResult}%` : scoreResult}
        </span>
    );
})

function StudentTestResult(props: SmartComponentProps<StoreTestExamResult>) {
    return (
        <div>
            <div className={styles.testResultTitle}>
                <span>{'Результаты тестирования: '}</span>
                <span className={props.store.isTestSuccess ?
                    styles.testResultTitleTrue :
                    styles.testResultTitleFalse}>
                    {props.store.examTestResultPublicText}
                </span>
            </div>
            <div className={styles.numberOfPointsContainer}>
                <span>{props.store.isPointsInPercent ? `Процент правильных ответов: ` : `Количество баллов за тест: `}</span>
                <TestResultScore
                    isPointsInPercent={props.store.isPointsInPercent}
                    examTestResultScore={props.store.examTestResultScore}
                />
            </div>
            <div className={styles.buttonReturnContainer}>
                <LinkAsButton
                    text={props.store.buttonReturnBackText}
                    href={props.store.linkReturnBack}
                />
            </div>
            <QuestionsList resultQuestionsList={props.store.resultQuestions}/>
        </div>
    );
}

export default React.memo(StudentTestResult);
