import {observer} from "mobx-react";
import React from "react";
import {DictionarySevObservationKind} from "../../../../interfaces/api/dictionarySevObservationKind";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionarySevObservationKind
} from "../../../../stores/admin/SevObservationKind/storeAdminPageContentDictionaryKindObservationType";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface SevObservationKindItemProps extends AdminActionButtonsProps {
    sevObservationKind: DictionarySevObservationKind;
}

const SevObservableCatalogItem = React.memo((props: SevObservationKindItemProps ) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Вид наблюдения:'}>
                {props.sevObservationKind.publicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.sevObservationKind.factoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Роль:'}>
                {props.sevObservationKind.roleFio}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionarySevObservationKindCatalog(props: SmartComponentProps<StoreAdminPageContentDictionarySevObservationKind>) {
    const dataOnCurrentPage: DictionarySevObservationKind[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют типы наблюдения для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <SevObservableCatalogItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                sevObservationKind={dataOnCurrentPage[i]}
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

export default observer(AdminDictionarySevObservationKindCatalog);
