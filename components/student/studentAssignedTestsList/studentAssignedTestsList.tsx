import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import {
    StudentAssignedTest,
    StudentAssignedTestQuestionGroups,
    StudentAssignedTestStatus
} from "../../../interfaces/api/studentAssignedTest";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreStudentPageContentAssignedTests
} from "../../../stores/student/assignedTests/storeStudentPageContentAssignedTests";
import {ItemsContainer} from "../../common/itemsContainer";
import {LabelWithContainerOnOneLine} from "../../common/labelWithContainerOnOneLine";
import {StandardPanel} from "../../common/standardPanel";
import {StandardTagItem} from "../../common/standardTagItem";
import {StubEmptyData} from "../../common/stubEmptyData";
import styles from './studentAssignedTestsListStyle.scss'

//region Группы вопросов
interface QuestionsGroupsListProps {
    readonly questionGroups: StudentAssignedTestQuestionGroups[]
}

const QuestionsGroupsList = React.memo((props: QuestionsGroupsListProps) => {
    if (!props.questionGroups.length) {
        return <span>{'Группы вопросов отсутствуют'}</span>
    }

    return (
        <>
            {props.questionGroups.map((item) =>
                <StandardTagItem
                    key={item.uuid}
                    publicNameMaxLength={30}
                    tagPublicName={item.questionGroupName}
                />
            )}
        </>
    );

});
//endregion

//region Экзаменационный тест
interface StudentExamTestItemProps {
    readonly examTest: StudentAssignedTest;
    readonly linkStartExamTest: string;
    readonly linkViewReport: string;
}

function getCssClassColorRemainedAttemptCount(inputRemainedAttemptCount: number): string {
    if (inputRemainedAttemptCount >= 70) {
        return styles.remainedAttemptCountMuch;
    }

    if (inputRemainedAttemptCount >= 40) {
        return styles.remainedAttemptCountMedium;
    }

    return styles.remainedAttemptCountFew;
}

interface PanelBottomButtonProps {
    readonly examTestId: number;
    readonly attemptId: number;
    readonly assignationId: number;
    readonly linkStartExamTest: string;
    readonly linkViewReport: string;
    readonly examTestStatus: StudentAssignedTestStatus;
}

const PanelBottomButton = React.memo((props: PanelBottomButtonProps) => {

    if (props.examTestStatus === 'finishSuccess') {
        return (
            <Link
                to={`${props.linkViewReport}/${props.attemptId}`}
                className={`${styles.bottomButton} ${styles.testStatusSuccess}`}>
                {'Тест успешно завершен, перейти к отчету'}
            </Link>
        );
    }


    if (props.examTestStatus === 'finishFailed') {
        return (
            <Link
                to={`${props.linkViewReport}/${props.attemptId}`}
                className={`${styles.bottomButton} ${styles.testStatusNotAvailable}`}>
                {'Тест провален, перейти к отчету'}
            </Link>
        );
    }

    if (props.examTestStatus === 'canStart') {
        return (
            <Link
                className={`${styles.bottomButton} ${styles.linkStartTest}`}
                to={`${props.linkStartExamTest}?test_id=${props.examTestId}&assignation_id=${props.assignationId}`}
            >
                {'Начать тестирование'}
            </Link>
        );
    }

    return (
        <span className={`${styles.bottomButton} ${styles.testStatusNotAvailable}`}>
            {'Тест недоступен для прохождения'}
        </span>
    );
});


const StudentExamTestItem = React.memo((props: StudentExamTestItemProps) => {
    return (
        <StandardPanel className={styles.testItemContainer}>
            <div className={styles.testItemContentContainer}>
                <div className={styles.testName}>{props.examTest.testPublicName}</div>

                <LabelWithContainerOnOneLine label={'Время выполнения:'}>
                    {props.examTest.testDurationSeconds ? `${props.examTest.testDurationSeconds} секунд` : 'Без ограничений'}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Количество попыток:'}>
                    <span className={getCssClassColorRemainedAttemptCount(props.examTest.remainedAttemptPercent)}>
                        {props.examTest.remainedAttemptCount}
                    </span>
                    <span>
                        {`/${props.examTest.attemptCount}`}
                    </span>
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Баллы за последнюю попытку:'}>
                    {props.examTest.lastAttemptScore}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Дата обновления теста:'}>
                    {props.examTest.updatedDateView}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Группы вопросов:'}>
                    <QuestionsGroupsList questionGroups={props.examTest.questionGroups}/>
                </LabelWithContainerOnOneLine>
            </div>
            <PanelBottomButton
                linkStartExamTest={props.linkStartExamTest}
                linkViewReport={props.linkViewReport}
                examTestId={props.examTest.examTestId}
                assignationId={props.examTest.assignationId}
                examTestStatus={props.examTest.examTestStatus}
                attemptId={props.examTest.attemptId}
            />
        </StandardPanel>
    );
});

//endregion


function StudentAssignedTestsList(props: SmartComponentProps<StoreStudentPageContentAssignedTests>) {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData
                emptyDataText={'Отсутствуют доступные тесты'}
            />
        )
    }

    const examTestElementsList: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        examTestElementsList.push(
            <StudentExamTestItem
                key={dataOnCurrentPage[i].uuid}
                examTest={dataOnCurrentPage[i]}
                linkStartExamTest={props.store.linkStartExamTest}
                linkViewReport={props.store.linkViewReport}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '3_column' : '1_column'}>
            {examTestElementsList}
        </ItemsContainer>
    );
}

export default observer(StudentAssignedTestsList);
