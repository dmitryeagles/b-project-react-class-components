import {observer} from "mobx-react";
import React from "react";
import {DictionaryArea} from "../../../../interfaces/api/dictionaryArea";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentDictionaryArea} from "../../../../stores/admin/area/storeAdminPageContentDictionaryArea";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface AreaItemProps extends AdminActionButtonsProps {
    area: DictionaryArea;
}

const AreaItem = React.memo((props: AreaItemProps ) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Участок / оборудование:'}>
                {props.area.areaPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.area.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryArea(props: SmartComponentProps<StoreAdminPageContentDictionaryArea>) {
    const dataOnCurrentPage: DictionaryArea[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют участки / оборудование для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <AreaItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                area={dataOnCurrentPage[i]}
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

export default observer(AdminDictionaryArea);
