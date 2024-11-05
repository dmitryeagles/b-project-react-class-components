import React from "react";
import {Link} from "react-router-dom";
import {dateFormatForView} from "ts-common-helpers";
import {AdminExamTestForEdit, AdminExamTestForEditQuestionGroup} from "../../../../interfaces/api/adminExamTestForEdit";
import {DropdownSelectItem} from "../../../common/dropdownSelect/dropdownSelect";
import {StandardPanel} from "../../../common/standardPanel";
import {StandardTagItem} from "../../../common/standardTagItem";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import styles from "./adminExamTestItemStyle.scss";

//region Должности
interface PositionsItemsListProps {
    readonly positionsList: DropdownSelectItem[];
}

const PositionsItemsList = React.memo((props: PositionsItemsListProps) => {
    if (!props.positionsList.length) {
        return (<span>{'Список должностей отсутствует'}</span>);
    }

    return (
        <>
            {props.positionsList.map((item) =>
                <StandardTagItem
                    key={item.value}
                    publicNameMaxLength={30}
                    tagPublicName={item.label}
                />
            )}
        </>
    );
});
//endregion

//region Группы вопросов
interface QuestionGroupListProps {
    readonly questionGroupList: AdminExamTestForEditQuestionGroup[];
}

const QuestionGroupList = React.memo((props: QuestionGroupListProps) => {
    if (!props.questionGroupList.length) {
        return (<span>{'Группы вопросов отсутствуют'}</span>);
    }

    return (
        <>
            {props.questionGroupList.map((item) =>
                <StandardTagItem
                    key={item.uuid}
                    publicNameMaxLength={30}
                    tagPublicName={item.questionGroupPublicName}
                />
            )}
        </>
    );
});
//endregion

//region Кнопки действий
interface ActionButtonsProps {
    readonly examTestUuId: string;
    readonly linkEditItem: string;
    readonly linkShowDemoTest: string;
    readonly eventDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ActionButtons = React.memo((props: ActionButtonsProps) => {
    return (
        <div className={styles.buttonsActionsContainer}>
            <button
                data-id={props.examTestUuId}
                onClick={props.eventDeleteItem}
                className={`${styles.buttonAction} ${styles.buttonActionDelete}`}>
                {'Удалить'}
            </button>

            <Link
                className={`${styles.buttonAction} ${styles.buttonShowDemoTest}`}
                to={props.linkShowDemoTest}
                target={'_blank'}
            >
                {'Просмотреть'}
            </Link>

            <Link
                className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                to={props.linkEditItem}
            >
                {'Подробно'}
            </Link>
        </div>
    );
});

//endregion

interface AdminExamTestItemProps {
    readonly examTest: AdminExamTestForEdit;
    readonly linkDemoViewTestExam: string;
    readonly linkEditItem: string;
    readonly eventDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function AdminExamTestItem(props: AdminExamTestItemProps) {
    const isTestEmpty: boolean = !props.examTest.questionsList.length && !props.examTest.questionsGroupsList.length;

    return (
        <StandardPanel className={styles.testItemContainer}>
            <div>
                <div className={styles.testTitle}>{props.examTest.examTestPublicName}</div>
                <AdminLabelWithContainerLine label={'Дата обновления:'}>
                    {dateFormatForView({
                        date: props.examTest.updatedDate,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Количество попыток:'}>
                    {props.examTest.attemptCount}
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Время выполнения, с:'}>
                    {props.examTest.examTestDurationSeconds}
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Завод:'}>
                    {props.examTest.factoryPublicName}
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Список должностей:'}>
                    <PositionsItemsList positionsList={props.examTest.positionsList}/>
                </AdminLabelWithContainerLine>

                <AdminLabelWithContainerLine label={'Группы вопросов:'}>
                    <QuestionGroupList questionGroupList={props.examTest.questionsGroupsList}/>
                </AdminLabelWithContainerLine>
                {
                    isTestEmpty ?
                        <div className={styles.emptyExamTest}>
                            {'Внимание! Тест не содержит группы вопросов и вопросы'}
                        </div> : null
                }
            </div>
            <ActionButtons
                examTestUuId={props.examTest.uuid}
                eventDeleteItem={props.eventDeleteItem}
                linkEditItem={`${props.linkEditItem}/${props.examTest.id}`}
                linkShowDemoTest={`${props.linkDemoViewTestExam}?test_id=${props.examTest.id}`}
            />
        </StandardPanel>
    );
}

export default React.memo(AdminExamTestItem);
