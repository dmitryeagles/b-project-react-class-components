import {observer} from "mobx-react";
import React from "react";
import {DictionaryNMTagClassification} from "../../../../interfaces/api/dictionaryNMTagClassification";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryNMTagClassification
} from "../../../../stores/admin/NMTagClassification/storeAdminPageContentDictionaryNMTagClassification";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface NMTagClassificationItemProps extends AdminActionButtonsProps {
    nmTagClassification: DictionaryNMTagClassification;
}

const NMTagClassificationItem = React.memo((props: NMTagClassificationItemProps) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Классификация бирки:'}>
                {props.nmTagClassification.nmTagClassificationPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.nmTagClassification.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryNMTagClassification(props: SmartComponentProps<StoreAdminPageContentDictionaryNMTagClassification>) {
    const dataOnCurrentPage: DictionaryNMTagClassification[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют классификация бирки для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <NMTagClassificationItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                nmTagClassification={dataOnCurrentPage[i]}
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

export default observer(AdminDictionaryNMTagClassification);
