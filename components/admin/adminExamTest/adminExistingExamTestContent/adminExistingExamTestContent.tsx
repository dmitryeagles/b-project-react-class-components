import {observer} from "mobx-react";
import React from "react";
import UserPlusIco from "../../../../img/svg_component/userPlus.svg";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentEditExamTest} from "../../../../stores/admin/testList/storeAdminPageContentEditExamTest";
import {AdminActionsButtonsDataManagement} from "../../adminActionsButtonsDataManagement";
import {AdminExamTestCategoryTitle} from "../adminExamTestCategoryTitle";
import {AdminExamTestWaitWriteMainInfo} from "../adminExamTestMainInfo/adminExamTestWaitWriteMainInfo";
import AdminExamTestQuestions from "../adminExamTestQuestions/adminExamTestQuestions/adminExamTestQuestions";
import AdminPopupEditorExamTestQuestion
    from "../adminExamTestQuestions/adminPopupEditorExamTestQuestion/adminPopupEditorExamTestQuestion";
import AdminExamTestQuestionsGroupsReadMode
    from "../adminExamTestQuestionsGroups/adminExamTestQuestionsGroupsReadMode/adminExamTestQuestionsGroupsReadMode";
import AdminPopupEditorExamTestQuestionsGroup
    from "../adminExamTestQuestionsGroups/adminPopupEditorExamTestQuestionsGroup/adminPopupEditorExamTestQuestionsGroup";


function AdminExistingExamTestContent(props: SmartComponentProps<StoreAdminPageContentEditExamTest>) {
    if (props.store.storeFlagIsNewItem.status) {
        return (<AdminExamTestWaitWriteMainInfo/>);
    }

    return (
        <>
            <AdminExamTestCategoryTitle categoryTitle={'Группы вопросов:'}/>
            <AdminActionsButtonsDataManagement
                buttonIco={<UserPlusIco/>}
                buttonText={'Добавить группу вопросов'}
                eventStartAddNewItem={props.store.eventStartAddNewQuestionsGroup}
            />
            <AdminExamTestQuestionsGroupsReadMode
                storeEditorQuestionsGroups={props.store.storeExamTestQuestionsGroupsReadMode}
                eventStartEditItem={props.store.eventStartEditQuestionsGroup}
                eventStartDeleteItem={props.store.eventStartDeleteQuestionsGroup}
            />
            <AdminExamTestCategoryTitle categoryTitle={'Список вопросов:'}/>
            <AdminActionsButtonsDataManagement
                buttonIco={<UserPlusIco/>}
                buttonText={'Добавить вопрос'}
                eventStartAddNewItem={props.store.eventStartAddNewQuestion}
            />
            <AdminExamTestQuestions
                storeExamTestQuestionsList={props.store.storeExamTestQuestionsListReadMode}
                eventStartDeleteItem={props.store.eventStartDeleteQuestion}
            />
            <AdminPopupEditorExamTestQuestionsGroup store={props.store}/>
            <AdminPopupEditorExamTestQuestion store={props.store}/>
        </>
    );
}

export default observer(AdminExistingExamTestContent);
