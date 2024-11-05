import {observer} from "mobx-react";
import React from "react";
import {AdminExamTestForEditQuestionGroup} from "../../../../../interfaces/api/adminExamTestForEdit";
import {
    StoreExamTestQuestionsGroupsReadMode
} from "../../../../../stores/admin/testList/readMode/storeExamTestQuestionsGroupsReadMode";
import {Paginate} from "../../../../common/paginate";
import {StandardPanel} from "../../../../common/standardPanel";
import {StubEmptyData} from "../../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../../adminLabelWithContainerLine";
import AdminExamTestActionButtonsForItem, {
    AdminExamTestActionButtonsForItemProps
} from "../../adminExamTestActionButtonsForItem/adminExamTestActionButtonsForItem";
import styles from './adminExamTestQuestionsGroupsReadModeStyle.scss';

interface QuestionsGroupItemProps extends AdminExamTestActionButtonsForItemProps{
    readonly questionsGroup:AdminExamTestForEditQuestionGroup;
}

const QuestionsGroupItem = React.memo((props: QuestionsGroupItemProps)=>{
    return(
        <StandardPanel>
            <AdminLabelWithContainerLine label={'Группа вопросов:'}>
                {props.questionsGroup.questionGroupPublicName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Количество вопросов:'}>
                {props.questionsGroup.questionCount}
            </AdminLabelWithContainerLine>
            <AdminExamTestActionButtonsForItem
                itemUuid={props.itemUuid}
                eventStartEditItem={props.eventStartEditItem}
                eventStartDeleteItem={props.eventStartDeleteItem}
            />
        </StandardPanel>
    );
});

interface QuestionsGroupsListProps {
    readonly questionsGroup:AdminExamTestForEditQuestionGroup[];
    readonly eventStartEditItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventStartDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionsGroupsList = React.memo((props: QuestionsGroupsListProps) => {

    if(!props.questionsGroup.length) {
        return (<StubEmptyData emptyDataText={'Группы вопросов не заданы'}/>)
    }

    return (
        <div className={styles.questionsGroupsListContainer}>
            {props.questionsGroup.map(item =>
                <QuestionsGroupItem
                    key={item.uuid}
                    itemUuid={item.uuid}
                    eventStartEditItem={props.eventStartEditItem}
                    eventStartDeleteItem={props.eventStartDeleteItem}
                    questionsGroup={item}
                />
            )}
        </div>
    );
});

interface AdminExamTestQuestionsGroupsReadModeProps{
    readonly storeEditorQuestionsGroups:StoreExamTestQuestionsGroupsReadMode;
    readonly eventStartEditItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventStartDeleteItem: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function AdminExamTestQuestionsGroupsReadMode(props: AdminExamTestQuestionsGroupsReadModeProps){
    return(
       <div>
           <QuestionsGroupsList
               questionsGroup={props.storeEditorQuestionsGroups.storeDataPagination.dataOnCurrentPage}
               eventStartDeleteItem={props.eventStartDeleteItem}
               eventStartEditItem={props.eventStartEditItem}
           />
           <Paginate store={props.storeEditorQuestionsGroups.storeDataPagination}/>
       </div>
    );
}

export default observer(AdminExamTestQuestionsGroupsReadMode);
