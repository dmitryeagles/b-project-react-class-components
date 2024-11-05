import {observer} from "mobx-react";
import React from "react";
import {DictionarySevObservationType} from "../../../../interfaces/api/dictionarySevObservationType";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionarySevObservationType
} from "../../../../stores/admin/SevObservationType/storeAdminPageContentDictionarySevObservationType";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface SevObservationTypeItemProps extends AdminActionButtonsProps {
    sevObservationType: DictionarySevObservationType;
}

const SevObservableCatalogItem = React.memo((props: SevObservationTypeItemProps ) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Тип наблюдения:'}>
                {props.sevObservationType.publicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.sevObservationType.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionarySevObservationTypeCatalog(props: SmartComponentProps<StoreAdminPageContentDictionarySevObservationType>) {
    const dataOnCurrentPage: DictionarySevObservationType[] = props.store.storeDataPagination.dataOnCurrentPage;

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
                sevObservationType={dataOnCurrentPage[i]}
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

export default observer(AdminDictionarySevObservationTypeCatalog);
