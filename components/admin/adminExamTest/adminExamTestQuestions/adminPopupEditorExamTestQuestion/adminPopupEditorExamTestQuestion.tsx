import {observer} from "mobx-react";
import React from "react";
import {TestQuestionEditModel} from "../../../../../interfaces/api/testQuestionEditModel";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentEditExamTest
} from "../../../../../stores/admin/testList/storeAdminPageContentEditExamTest";
import {Paginate} from "../../../../common/paginate";
import {StandardPanel} from "../../../../common/standardPanel";
import {StubEmptyData} from "../../../../common/stubEmptyData";
import {AdminPopup} from "../../../adminPopup";
import ExamTestQuestionContentReadMode
    from "../../../adminQuestionBank/testQuestionsListReadMode/examTestQuestionContentReadMode";
import styles from "./adminPopupEditorExamTestQuestionStyle.scss";


interface QuestionItemProps {
    readonly question: TestQuestionEditModel;
    readonly eventSelectQuestion: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionItem = React.memo((props: QuestionItemProps) => {
    return (
        <StandardPanel className={styles.questionItem}>
            <div className={styles.questionItemContent}>
                <ExamTestQuestionContentReadMode question={props.question}/>
            </div>
            <button
                data-id={props.question.uuid}
                onClick={props.eventSelectQuestion}
                className={styles.buttonSelectQuestion}
            >
                {'Выбрать'}
            </button>
        </StandardPanel>
    );
});

interface QuestionsGroupsListProps {
    readonly questions: TestQuestionEditModel[];
    readonly eventSelectQuestion: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionsList = React.memo((props: QuestionsGroupsListProps) => {

    if (!props.questions.length) {
        return (<StubEmptyData emptyDataText={'Вопросы не заданы'}/>)
    }

    return (
        <div className={styles.questionsListContainer}>
            {props.questions.map(item =>
                <QuestionItem
                    key={item.uuid}
                    eventSelectQuestion={props.eventSelectQuestion}
                    question={item}
                />
            )}
        </div>
    );
});


function AdminPopupEditorExamTestQuestion(props: SmartComponentProps<StoreAdminPageContentEditExamTest>) {

    if (!props.store.storePopupEditorQuestion) {
        return null;
    }

    return (
        <AdminPopup
            className={styles.popupBodySize}
            eventClosePopup={props.store.storePopupEditorQuestion.eventCloseEditor}
            popupTitle={props.store.storePopupEditorQuestion.textEditorTitle}
        >
            <QuestionsList
                questions={props.store.storePopupEditorQuestion.storeDataPagination.dataOnCurrentPage}
                eventSelectQuestion={props.store.storePopupEditorQuestion.eventSelectQuestion}
            />
            <Paginate store={props.store.storePopupEditorQuestion.storeDataPagination}/>
        </AdminPopup>
    );
}

export default observer(AdminPopupEditorExamTestQuestion);
