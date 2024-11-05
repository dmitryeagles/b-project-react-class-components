import {observer} from "mobx-react";
import React from "react";
import {DictionaryNMKind} from "../../../../interfaces/api/dictionaryNMKind";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryNMKind
} from "../../../../stores/admin/NMKind/storeAdminPageContentDictionaryNMKind";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface NMKindItemProps extends AdminActionButtonsProps {
    nmKind: DictionaryNMKind;
}

const NMKindItem = React.memo((props: NMKindItemProps) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Вид NearMiss:'}>
                {props.nmKind.nmKindPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.nmKind.factoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Роль в системе:'}>
                {props.nmKind.rolePublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryNMKind(props: SmartComponentProps<StoreAdminPageContentDictionaryNMKind>) {
    const dataOnCurrentPage: DictionaryNMKind[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют виды NearMiss для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <NMKindItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                nmKind={dataOnCurrentPage[i]}
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

export default observer(AdminDictionaryNMKind);
