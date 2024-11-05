import {observer} from "mobx-react";
import React from "react";
import {DictionarySevRiskDegreeCatalog} from "../../../../interfaces/api/dictionarySevRiskDegreeCatalog";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionarySevRiskDegreeCatalog
} from "../../../../stores/admin/SevRiskDegreeCatalog/storeAdminPageContentDictionarySevRiskDegreeCatalog";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface SevRiskDegreeCatalogItemProps extends AdminActionButtonsProps {
    sevRiskDegreeCatalog: DictionarySevRiskDegreeCatalog;
}

const SevObservableCatalogItem = React.memo((props: SevRiskDegreeCatalogItemProps ) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Степень риска:'}>
                {props.sevRiskDegreeCatalog.sevRiskDegreeCatalogPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.sevRiskDegreeCatalog.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionarySevRiskDegreeCatalog(props: SmartComponentProps<StoreAdminPageContentDictionarySevRiskDegreeCatalog>) {
    const dataOnCurrentPage: DictionarySevRiskDegreeCatalog[] = props.store.storeDataPagination.dataOnCurrentPage;

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
                sevRiskDegreeCatalog={dataOnCurrentPage[i]}
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

export default observer(AdminDictionarySevRiskDegreeCatalog);
