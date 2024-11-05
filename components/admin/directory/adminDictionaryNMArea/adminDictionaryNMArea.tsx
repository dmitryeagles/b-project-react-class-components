import {observer} from "mobx-react";
import React from "react";
import {DictionaryNMArea} from "../../../../interfaces/api/dictionaryNMArea";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryNMArea
} from "../../../../stores/admin/NMArea/storeAdminPageContentDictionaryNMArea";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface NMAreaItemProps extends AdminActionButtonsProps {
    nmArea: DictionaryNMArea;
}

const NMAreaItem = React.memo((props: NMAreaItemProps ) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Участок NearMiss:'}>
                {props.nmArea.nmAreaPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.nmArea.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryNMArea(props: SmartComponentProps<StoreAdminPageContentDictionaryNMArea>) {
    const dataOnCurrentPage: DictionaryNMArea[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют участки NearMiss для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <NMAreaItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                nmArea={dataOnCurrentPage[i]}
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

export default observer(AdminDictionaryNMArea);
