import React, {useState} from "react";
import {AnswerEditModel, TestQuestionEditModel} from "../../../../interfaces/api/testQuestionEditModel";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import styles from "./examTestQuestionContentReadModeStyle.scss";

//region Показать/скрыть ответы
interface ShowHideAnswersProps {
    readonly isOpen: boolean;
    readonly eventToggleOpenClose: () => void;
}

const ShowHideAnswers = React.memo((props: ShowHideAnswersProps) => {
    const publicText: string = props.isOpen ? 'Свернуть ответы' : 'Показать ответы';
    const cssClassStatus: string = props.isOpen ? styles.buttonShowAnswersOpen : styles.buttonShowAnswersClose;
    return (
        <div className={styles.buttonShowAnswersContainer}>
            <span
                className={`${cssClassStatus} ${styles.buttonShowAnswers}`}
                onClick={props.eventToggleOpenClose}>
                {publicText}
            </span>
        </div>
    );
});
//endregion

//region Ответ на вопрос
interface TestAnswerProps {
    answer: AnswerEditModel;
}

const TestAnswer = React.memo((props: TestAnswerProps) => {
    return (
        <div
            className={`${props.answer.isCorrect ? styles.testAnswerTrue : styles.testAnswerFalse} ${styles.testAnswer}`}>
            <div
                className={styles.answerContent}
                dangerouslySetInnerHTML={{
                    __html: props.answer.answerText
                }}
            />
        </div>
    );
});
//endregion

//region Ответы на вопросы

interface AnswersListProps {
    answerList: AnswerEditModel[];
}

const AnswersList = React.memo((props: AnswersListProps) => {
    const answersListElements: JSX.Element[] = [];

    for (let i = 0; i < props.answerList.length; ++i) {
        answersListElements.push(
            <TestAnswer
                key={props.answerList[i].uuid}
                answer={props.answerList[i]}/>
        );
    }

    return (
        <div className={styles.testAnswersListContainer}>
            {answersListElements}
        </div>
    );
});

//endregion

interface ExamTestQuestionContentReadModeProps {
    readonly question: TestQuestionEditModel;
}

function ExamTestQuestionContentReadMode(props: ExamTestQuestionContentReadModeProps) {
    const [isOpenAnswers, setOpenAnswers] = useState(false);
    return (
        <div>
            <div className={styles.questionTextContainer}>
                <span className={styles.questionTextLabel}>
                    <span>{'Вопрос: '}</span>
                     <span className={styles.questionTextLabelIco}>?</span>
                </span>
                <div
                    className={styles.questionContent}
                    dangerouslySetInnerHTML={{
                        __html: props.question.questionText
                    }}
                />
            </div>

            <AdminLabelWithContainerLine label={'Группа:'}>
                {props.question.questionGroupPublicName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.question.factoryPublicName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Количество баллов:'}>
                {props.question.score}
            </AdminLabelWithContainerLine>
            {
                props.question.answersList.length > 0 ?
                    <>
                        <ShowHideAnswers
                            isOpen={isOpenAnswers}
                            eventToggleOpenClose={() => {
                                setOpenAnswers(!isOpenAnswers)
                            }}
                        />

                        {
                            isOpenAnswers ?
                                <AnswersList answerList={props.question.answersList}/>
                                : null
                        }
                    </>
                    : null
            }
        </div>
    );

}

export default React.memo(ExamTestQuestionContentReadMode);
