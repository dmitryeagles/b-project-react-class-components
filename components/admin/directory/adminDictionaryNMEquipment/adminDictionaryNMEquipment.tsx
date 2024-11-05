import {observer} from "mobx-react";
import React from "react";
import {DictionaryNMEquipment} from "../../../../interfaces/api/dictionaryNMEquipment";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryNMEquipment
} from "../../../../stores/admin/dictionaryNMEquipment/storeAdminPageContentDictionaryNMEquipment";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface NMEquipmentItemProps extends AdminActionButtonsProps {
    readonly item: DictionaryNMEquipment;
}

const NMEquipmentItem = React.memo((props: NMEquipmentItemProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Оборудование:'}
            >
                {props.item.publicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Завод:'}
            >
                {props.item.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});


function AdminDictionaryNMEquipment(props: SmartComponentProps<StoreAdminPageContentDictionaryNMEquipment>) {
    const dataOnCurrentPage: DictionaryNMEquipment[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Отсутствует оборудование для отображения'}/>);
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {dataOnCurrentPage.map(item=>
                <NMEquipmentItem
                    key={item.uuid}
                    itemId={item.uuid}
                    item={item}
                    eventDeleteItem={props.store.eventStartDeleteItem}
                    eventStartEdit={props.store.eventStartChangeItem}
                />
            )}
        </ItemsContainer>
    );
}

export default observer(AdminDictionaryNMEquipment);
