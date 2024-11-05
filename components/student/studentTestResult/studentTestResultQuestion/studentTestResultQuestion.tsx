import React, {useState} from "react";
import {numberRounding} from "../../../../helpers/numberRounding";
import CancelIcoSVG from '../../../../img/svg_component/triangleExclamation.svg';
import {TestExamResultAnswer, TestExamResultQuestion} from "../../../../interfaces/api/testExam";
import {StudentTestResultAnswer} from "../studentTestResultAnswer";
import styles from './studentTestResultQuestionStyle.scss';

//region Список ответов
interface AnswersListProps {
    readonly answersResultList: TestExamResultAnswer[];
}

const AnswersList = React.memo((props: AnswersListProps) => {
    const answersElements: JSX.Element[] = [];

    if(!props.answersResultList.length){
        return (
            <div className={styles.answersContainerEmpty}>
                <CancelIcoSVG/>
                <span>{` Ответы не были выбраны`}</span>
            </div>
        );
    }

    for (let i = 0; i < props.answersResultList.length; ++i) {
        answersElements.push(
            <StudentTestResultAnswer
                key={props.answersResultList[i].uuid}
                answerResult={props.answersResultList[i]}
            />
        );
    }

    return (
        <div className={styles.answersContainer}>
            {answersElements}
        </div>
    );
});
//endregion

//region Баллов за вопрос
interface QuestionResultScoreProps {
    readonly questionScore: number;
}

const QuestionResultScore = React.memo((props: QuestionResultScoreProps)=>{
    let scoreResult: number = 0;
    if (typeof props.questionScore === 'number') {
        if(props.questionScore > 0) {
            scoreResult = numberRounding(props.questionScore, 2);
        }
    }
    return(<span className={styles.numberOfPointsContainer}>{`${scoreResult} баллов`}</span>);
});
//endregion

interface StudentTestResultQuestionProps {
    readonly questionResult: TestExamResultQuestion;
}

function StudentTestResultQuestion(props: StudentTestResultQuestionProps) {
    const [isShowAnswers, setIsShowAnswers] = useState(false);
    const showAnswersText: string = props.questionResult.isDone ? 'Показать ответы' : 'В ответах допущены ошибки, показать ответы'
    const publicText: string = isShowAnswers ? 'Свернуть ответы' : showAnswersText;
    const cssClassArrowOpen: string = props.questionResult.isDone ? styles.buttonShowAnswersOpenTrue : styles.buttonShowAnswersOpenFalse;
    const cssClassArrowClose: string = props.questionResult.isDone ? styles.buttonShowAnswersCloseTrue : styles.buttonShowAnswersCloseFalse;
    const cssClassQuestionStatus: string = props.questionResult.isDone ? styles.buttonShowAnswersTrue : styles.buttonShowAnswersFalse;
    const cssClassStatusOpen: string = isShowAnswers ? cssClassArrowOpen : cssClassArrowClose;

    return (
        <div className={props.questionResult.isDone ?
            `${styles.questionTrue} ${styles.componentContainer}` :
            `${styles.questionFalse} ${styles.componentContainer}`}
        >
            <div className={styles.questionContentContainer}>
                <div
                    className={styles.questionContent}
                    dangerouslySetInnerHTML={{
                    __html: props.questionResult.questionPublicText
                }}
                />
                <QuestionResultScore questionScore={props.questionResult.numberOfPoints}/>
            </div>

            <div className={styles.buttonShowAnswersContainer}>
                <span
                    className={`${cssClassStatusOpen} ${styles.buttonShowAnswers} ${cssClassQuestionStatus}`}
                    onClick={() => setIsShowAnswers(!isShowAnswers)}
                >
                    {publicText}
                </span>
            </div>
            {
                isShowAnswers ? <AnswersList answersResultList={props.questionResult.answersList}/> : null
            }
        </div>
    );
}

export default React.memo(StudentTestResultQuestion)
