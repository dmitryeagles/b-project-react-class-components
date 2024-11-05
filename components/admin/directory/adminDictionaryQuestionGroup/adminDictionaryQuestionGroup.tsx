import {observer} from "mobx-react";
import React from "react";
import {DictionaryQuestionGroup} from "../../../../interfaces/api/dictionaryQuestionGroup";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryQuestionGroup
} from "../../../../stores/admin/questionGroup/storeAdminPageContentDictionaryQuestionGroup";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {SimpleDictionaryItem, SimpleDictionaryItemsListContainer} from "../index";

function AdminDictionaryQuestionGroup(props: SmartComponentProps<StoreAdminPageContentDictionaryQuestionGroup>) {
    const dataOnCurrentPage: DictionaryQuestionGroup[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют группы вопросов для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <SimpleDictionaryItem
                key={dataOnCurrentPage[i].uuid}
                itemUuid={dataOnCurrentPage[i].uuid}
                value={dataOnCurrentPage[i].label}
                eventDeleteItem={props.store.eventStartDeleteItem}
                eventStartEdit={props.store.eventStartChangeItem}
            />
        );
    }

    return (
        <SimpleDictionaryItemsListContainer>
            {dictionaryListElements}
        </SimpleDictionaryItemsListContainer>
    );
}

export default observer(AdminDictionaryQuestionGroup);
