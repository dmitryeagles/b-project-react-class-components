import {observer} from "mobx-react";
import React from "react";
import {DictionaryFactory} from "../../../../interfaces/api/dictionaryFactory";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryFactory
} from "../../../../stores/admin/factory/storeAdminPageContentDictionaryFactory";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {SimpleDictionaryItem, SimpleDictionaryItemsListContainer} from "../index";

function AdminDictionaryFactory(props: SmartComponentProps<StoreAdminPageContentDictionaryFactory>) {

    const dataOnCurrentPage: DictionaryFactory[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Отсутствуют фабрики для отображения'}/>);
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

export default observer(AdminDictionaryFactory);
