import {observer} from "mobx-react";
import React from "react";
import {AdminExamTestForEditQuestion} from "../../../../../interfaces/api/adminExamTestForEdit";
import {
    StoreExamTestQuestionsListReadMode
} from "../../../../../stores/admin/testList/readMode/storeExamTestQuestionsListReadMode";
import {Paginate} from "../../../../common/paginate";
import {StandardPanel} from "../../../../common/standardPanel";
import {StubEmptyData} from "../../../../common/stubEmptyData";
import ExamTestQuestionContentReadMode
    from "../../../adminQuestionBank/testQuestionsListReadMode/examTestQuestionContentReadMode";
import AdminExamTestActionButtonsForItem
    from "../../adminExamTestActionButtonsForItem/adminExamTestActionButtonsForItem";
import styles from "./adminExamTestQuestionsStyle.scss";

interface QuestionItemProps {
    readonly question: AdminExamTestForEditQuestion;
    readonly itemUuid: string;
    readonly eventStartDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionItem = React.memo((props: QuestionItemProps) => {
    return (
        <StandardPanel className={styles.questionItem}>
            <ExamTestQuestionContentReadMode question={props.question.questionDetailInfo}/>
            <AdminExamTestActionButtonsForItem
                itemUuid={props.itemUuid}
                eventStartDeleteItem={props.eventStartDeleteItem}
            />
        </StandardPanel>
    );
});

interface QuestionsGroupsListProps {
    readonly questions: AdminExamTestForEditQuestion[];
    readonly eventStartDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
                    eventStartDeleteItem={props.eventStartDeleteItem}
                    itemUuid={item.uuid}
                    question={item}
                />
            )}
        </div>
    );
});

interface AdminExamTestQuestionsProps {
    readonly storeExamTestQuestionsList: StoreExamTestQuestionsListReadMode;
    readonly eventStartDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function AdminExamTestQuestions(props: AdminExamTestQuestionsProps) {
    return (
        <div>
            <QuestionsList
                questions={props.storeExamTestQuestionsList.storeDataPagination.dataOnCurrentPage}
                eventStartDeleteItem={props.eventStartDeleteItem}
            />
            <Paginate store={props.storeExamTestQuestionsList.storeDataPagination}/>
        </div>
    );
}

export default observer(AdminExamTestQuestions);
