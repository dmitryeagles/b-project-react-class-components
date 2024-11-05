import {observer} from "mobx-react";
import React from "react";
import {DictionarySevObservableCatalog} from "../../../../interfaces/api/dictionarySevObservableCatalog";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionarySevObservableCatalog
} from "../../../../stores/admin/SevObservableCatalog/storeAdminPageContentDictionarySevObservableCatalog";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface SevObservableCatalogItemProps extends AdminActionButtonsProps {
    sevObservableCatalog: DictionarySevObservableCatalog;
}

const SevObservableCatalogItem = React.memo((props: SevObservableCatalogItemProps ) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Наблюдаемый:'}>
                {props.sevObservableCatalog.sevObservableCatalogPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.sevObservableCatalog.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionarySevObservableCatalog(props: SmartComponentProps<StoreAdminPageContentDictionarySevObservableCatalog>) {
    const dataOnCurrentPage: DictionarySevObservableCatalog[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют наблюдаемые для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <SevObservableCatalogItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                sevObservableCatalog={dataOnCurrentPage[i]}
                eventStartEdit={props.store.eventStartChangeItem}
                eventDeleteItem={props.store.eventStartDeleteItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {dictionaryListElements}
        </ItemsContainer>
    );
}

export default observer(AdminDictionarySevObservableCatalog);
