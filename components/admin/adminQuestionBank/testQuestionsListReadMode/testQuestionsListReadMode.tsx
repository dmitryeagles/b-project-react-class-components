import {observer} from "mobx-react";
import React from "react";
import {TestQuestionEditModel} from "../../../../interfaces/api/testQuestionEditModel";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentQuestionsBank
} from "../../../../stores/admin/questionBank/storeAdminPageContentQuestionsBank";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {StubErrorGetData} from "../../../common/stubErrorGetData";
import TestQuestionReadMode from "./testQuestionReadMode";

function TestQuestionsListReadMode(props: SmartComponentProps<StoreAdminPageContentQuestionsBank>) {
    if (props.store.errorWhileGettingData) {
        return (
            <StubErrorGetData errorText={props.store.errorWhileGettingData}/>
        );
    }

    const dataOnCurrentPage: TestQuestionEditModel[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют вопросы для отображения'}/>
        );
    }

    const questionsListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        questionsListElements.push(
            <TestQuestionReadMode
                key={dataOnCurrentPage[i].uuid}
                question={dataOnCurrentPage[i]}
                itemId={dataOnCurrentPage[i].uuid}
                eventStartEdit={props.store.eventStartChangeItem}
                eventDeleteItem={props.store.eventStartDeleteItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {questionsListElements}
        </ItemsContainer>
    );
}


export default observer(TestQuestionsListReadMode);
