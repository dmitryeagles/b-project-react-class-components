import {observer} from "mobx-react";
import React from "react";
import {Link} from "react-router-dom";
import {dateFormatForView} from "ts-common-helpers";
import {UserAvailableExamTests, UserExamTestGenerationOptions} from "../../../interfaces/api/userAvailableExamTests";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {
    StoreStudentPageContentExamTestList
} from "../../../stores/student/examTestList/storeStudentPageContentExamTestList";
import {ItemsContainer} from "../../common/itemsContainer";
import {LabelWithContainerOnOneLine} from "../../common/labelWithContainerOnOneLine";
import {StandardPanel} from "../../common/standardPanel";
import {StandardTagItem} from "../../common/standardTagItem";
import {StubEmptyData} from "../../common/stubEmptyData";
import styles from './studentExamTestListStyle.scss'

//region Группы вопросов
interface QuestionsGroupsListProps {
    readonly generationOptions: UserExamTestGenerationOptions[]
}

const QuestionsGroupsList = React.memo((props: QuestionsGroupsListProps) => {
    if (!props.generationOptions.length) {
        return <span>{'Группы вопросов отсутствуют'}</span>
    }

    const questionsGroupsElements: JSX.Element[] = [];

    for (let i = 0; i < props.generationOptions.length; ++i) {
        questionsGroupsElements.push(
            <StandardTagItem
                key={props.generationOptions[i].uuid}
                publicNameMaxLength={30}
                tagPublicName={props.generationOptions[i].questionGroupName}
            />
        );
    }

    return (
        <>
            {questionsGroupsElements}
        </>
    );

});
//endregion


//region Экзаменационный тест
interface StudentExamTestItemProps {
    readonly examTest: UserAvailableExamTests;
    readonly linkStartExamTest: string;
    readonly attestationId: number;
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

const StudentExamTestItem = React.memo((props: StudentExamTestItemProps) => {
    return (
        <StandardPanel className={styles.testItemContainer}>
            <div className={styles.testItemContentContainer}>
                <div className={styles.testName}>{props.examTest.testName}</div>

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
                    {dateFormatForView({
                        date: props.examTest.updatedDate,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                </LabelWithContainerOnOneLine>

                <LabelWithContainerOnOneLine label={'Группы вопросов:'}>
                    <QuestionsGroupsList generationOptions={props.examTest.generationOptions}/>
                </LabelWithContainerOnOneLine>
            </div>
            {
                props.examTest.remainedAttemptCount > 0 ?
                    <Link
                        className={`${styles.bottomButton} ${styles.linkStartTest}`}
                        to={`${props.linkStartExamTest}?test_id=${props.examTest.testId}&attestation_id=${props.attestationId}`}
                    >
                        {'Начать тестирование'}
                    </Link> :
                    <span
                        className={`${styles.bottomButton} ${styles.testNotAvailable}`}
                    >
                      {'Количество попыток исчерпано'}
                    </span>
            }
        </StandardPanel>
    );
});

//endregion


function StudentExamTestList(props: SmartComponentProps<StoreStudentPageContentExamTestList>) {
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
                attestationId={props.store.attestationId}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {examTestElementsList}
        </ItemsContainer>
    );
}

export default observer(StudentExamTestList);
