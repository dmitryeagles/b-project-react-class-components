import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreTestExam} from "../../../../stores/passingExamTest/storeTestExam";
import {
    StudentButtonFinishTest,
    StudentPassingTestAnswersList,
    StudentPassingTestExamQuestion,
    StudentPassingTestTitle
} from "../index";
import StudentTestExamButtonsNextPrevQuestion
    from "../studentTestExamButtonsNextPrevQuestion/studentTestExamButtonsNextPrevQuestion";
import StudentTestExamProgress from "../studentTestExamProgress/studentTestExamProgress";
import TestExamCountdownTimer from "../testExamCountdownTimer/testExamCountdownTimer";
import styles from './studentTestExamStyle.scss';

const TestExamProgress = observer((props: SmartComponentProps<StoreTestExam>) => {
    return (
        <StudentTestExamProgress
            currentQuestionNumber={props.store.currentQuestion.questionNumber}
            totalQuestionsNumber={props.store.totalQuestions}
            progressPercent={props.store.currentQuestion.progressPercent}
        />
    );
});

const TestExamButtonsNextPrevQuestion = observer((props: SmartComponentProps<StoreTestExam>) => {
    return (
        <StudentTestExamButtonsNextPrevQuestion
            eventNextQuestion={props.store.currentQuestion.nextQuestionUuid ? props.store.eventShowNextQuestion : undefined}
            eventPrevQuestion={props.store.currentQuestion.prevQuestionUuid ? props.store.eventShowPrevQuestion : undefined}
        />
    );
});

const PassingTestExamQuestion = observer((props: SmartComponentProps<StoreTestExam>) => {
    return (
        <>
            <StudentPassingTestTitle
                titleText={`Вопрос № ${props.store.currentQuestion.questionNumber}:`}
                className={styles.titleQuestion}
            />
            <StudentPassingTestExamQuestion
                questionText={props.store.currentQuestion.questionText}
            />
        </>
    );
});

const PassingTestAnswersList = observer((props: SmartComponentProps<StoreTestExam>) => {
    return (
        <StudentPassingTestAnswersList
            answersList={props.store.currentQuestion.questionAnswersList}
            isMultiSelectAnswers={props.store.currentQuestion.isMultiSelectAnswers}
            storeAnswersStatus={props.store.storeAnswersStatus}
        />
    );
});

class StudentTestExam extends React.PureComponent<SmartComponentProps<StoreTestExam>> {
   constructor(props:SmartComponentProps<StoreTestExam>) {
       super(props);
   }

   public componentDidMount() {
       // Добавляем события аварийного завершения теста
       this.props.store.addEventsEmergencyFinishTest();
   }

   public componentWillUnmount() {
       // Вызываем событие аварийного завершения теста
       this.props.store.eventEmergencyFinishExamTest();
       // Удаляем события аварийного завершения теста
       this.props.store.removeEventsEmergencyFinishTest();
   }

    render() {
       return (
           <div>
               <div className={styles.topButtonsContainer}>
                   <TestExamCountdownTimer
                       timerDurationSeconds={this.props.store.testDurationSeconds}
                       eventTimeIsUp={this.props.store.eventTimerEnd}
                   />
                   <StudentButtonFinishTest eventClick={this.props.store.eventUserFinishTest}/>
               </div>

               <div className={styles.progressBarContainer}>
                   <TestExamProgress store={this.props.store}/>
               </div>

               <div className={styles.questionsButtonsContainer}>
                   <TestExamButtonsNextPrevQuestion store={this.props.store}/>
               </div>

               <PassingTestExamQuestion store={this.props.store}/>

               <StudentPassingTestTitle
                   titleText={'Список ответов:'}
                   className={styles.titleAnswersList}
               />

               <PassingTestAnswersList store={this.props.store}/>
           </div>
       );
   }

}

export default React.memo(StudentTestExam);
