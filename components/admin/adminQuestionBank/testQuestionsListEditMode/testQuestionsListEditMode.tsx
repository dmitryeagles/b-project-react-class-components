import {observer} from "mobx-react";
import React from "react";
import CancelIco from "../../../../img/svg_component/cancel.svg";
import PlusIco from "../../../../img/svg_component/plus.svg";
import SaveIco from "../../../../img/svg_component/save.svg";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminEditModeQuestionAndHisAnswers
} from "../../../../stores/admin/questionBank/editData/storeAdminEditModeQuestionAndHisAnswers";
import {StoreComponentDropdownSelect} from "../../../../stores/common/storeComponentDropdownSelect";
import {StoreComponentInputNumber} from "../../../../stores/common/storeComponentInputNumber";
import {ButtonsContainer} from "../../../common/buttonsContainer";
import {DropdownSelect} from "../../../common/dropdownSelect";
import {InputNumeric} from "../../../common/inputNumeric";
import {Paginate} from "../../../common/paginate";
import {StandardButton} from "../../../common/standardButton";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminActionsButtonsDataManagement} from "../../adminActionsButtonsDataManagement";
import {AdminLabelWithContainerTwoLine} from "../../adminLabelWithContainerTwoLine";
import {EditorAnswerEditMode, EditorAnswerReadMode, EditorQuestionEditMode} from "./editMode";
import styles from "./testQuestionsListEditModeStyle.scss";

const TEXT_QUESTION_OPTIONS: string = 'Параметры вопроса';
const TEXT_QUESTION: string = 'Текст вопроса';
const TEXT_LIST_ANSWERS: string = 'Список ответов';
const TEXT_ADD_ANSWER: string = 'Добавить ответ';
const TEXT_EMPTY_LIST_ANSWERS: string = 'Список ответов пуст';
const TEXT_SAVE_ANSWER: string = 'Сохранить';
const TEXT_CANCEL_ANSWER: string = 'Отменить';

const EditorScores = observer((props: SmartComponentProps<StoreComponentInputNumber>) => {
    return (
        <InputNumeric
            eventChange={props.store.eventChangeValue}
            errorText={props.store.errorText}
            max={props.store.maxValue}
            min={props.store.minValue}
            value={props.store.value}
        />
    );
});

const DropdownSelectEditorFactory = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <div>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </div>
    );
});

const DropdownSelectEditorQuestionGroup = observer((props: SmartComponentProps<StoreComponentDropdownSelect>) => {
    return (
        <div>
            <DropdownSelect
                eventChange={props.store.eventChangeValue}
                isClearable={false}
                placeholder={props.store.placeholder}
                selectedValue={props.store.selectedValue}
                optionsList={props.store.optionsList}
            />
            {props.store.errorText ? <div className={styles.errorText}>{props.store.errorText}</div> : null}
        </div>
    );
});

const AnswerList = observer((props: SmartComponentProps<StoreAdminEditModeQuestionAndHisAnswers>) => {
    const dataOnCurrentPageAnswers = props.store.storeDataPagination.dataOnCurrentPage;
    const answersListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPageAnswers.length; ++i) {
        if (props.store.storeEditAnswer) {
            if (props.store.storeEditAnswer.answerUuid === dataOnCurrentPageAnswers[i].uuid) {
                answersListElements.push(
                    <EditorAnswerEditMode
                        key={props.store.storeEditAnswer.answerUuid}
                        store={props.store.storeEditAnswer}
                    />
                );
                continue;
            }
        }

        answersListElements.push(
            <EditorAnswerReadMode
                key={dataOnCurrentPageAnswers[i].uuid}
                itemId={dataOnCurrentPageAnswers[i].uuid}
                eventStartEdit={props.store.eventStartEditAnswer}
                eventDeleteItem={props.store.eventStartDeleteAnswer}
                answer={dataOnCurrentPageAnswers[i]}
            />
        );
    }

    return (
        <div>
            {
                props.store.storeEditAnswer?.isNewAnswer ?
                    <EditorAnswerEditMode store={props.store.storeEditAnswer}/> : null
            }
            {
                answersListElements.length ?
                    <div className={styles.answersListElements}>
                        {answersListElements}
                    </div>
                    :
                    <StubEmptyData emptyDataText={TEXT_EMPTY_LIST_ANSWERS}/>
            }
        </div>
    );
});

const EditorQuestion = observer((props: SmartComponentProps<StoreAdminEditModeQuestionAndHisAnswers>) => {
    return (
        <div>
            <div className={styles.titleOptionsContainer}>{TEXT_QUESTION}</div>
            <EditorQuestionEditMode
                store={props.store.storeEditQuestionText}
                questionUuid={props.store.questionUuid}
            />
        </div>
    );
});

function TestQuestionsListEditMode(props: SmartComponentProps<StoreAdminEditModeQuestionAndHisAnswers>) {
    return (
        <>
            <ButtonsContainer className={styles.editQuestionActions}>
                <StandardButton
                    iconLeft={<SaveIco/>}
                    text={TEXT_SAVE_ANSWER}
                    eventClick={props.store.eventSaveEditData}
                    type={'primary'}
                />
                <StandardButton
                    iconLeft={<CancelIco/>}
                    text={TEXT_CANCEL_ANSWER}
                    eventClick={props.store.eventCloseEditor}
                    type={'cancel'}
                />
            </ButtonsContainer>

            {/* Параметры вопроса */}
            <div className={styles.titleOptionsContainer}>{TEXT_QUESTION_OPTIONS}</div>
            <div className={styles.optionsQuestionContainer}>
                <AdminLabelWithContainerTwoLine label={'Завод:'}>
                    <DropdownSelectEditorFactory store={props.store.storeEditFactory}/>
                </AdminLabelWithContainerTwoLine>
                <AdminLabelWithContainerTwoLine label={'Группа:'}>
                    <DropdownSelectEditorQuestionGroup store={props.store.storeEditGroup}/>
                </AdminLabelWithContainerTwoLine>
                <AdminLabelWithContainerTwoLine
                label={'Количество баллов за все правильные ответы:'}
            >
                <EditorScores store={props.store.storeEditorScores}/>
            </AdminLabelWithContainerTwoLine>
            </div>

            {/* Текст вопроса */}
            <EditorQuestion store={props.store}/>

            {/* Список ответов */}
            <div className={styles.answersListContainer}>
                <div className={styles.answersTitleContainer}>
                    <div className={styles.titleAnswersContainer}>{TEXT_LIST_ANSWERS}</div>
                    <AdminActionsButtonsDataManagement
                        buttonText={TEXT_ADD_ANSWER}
                        eventStartAddNewItem={props.store.eventAddNewAnswer}
                        buttonIco={<PlusIco/>}
                    />
                </div>
                <AnswerList store={props.store}/>
                <Paginate store={props.store.storeDataPagination}/>
            </div>
        </>
    );
}


export default observer(TestQuestionsListEditMode);
