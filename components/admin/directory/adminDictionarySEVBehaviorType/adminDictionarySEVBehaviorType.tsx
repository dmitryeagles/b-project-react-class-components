import {observer} from "mobx-react";
import React from "react";
import {DictionarySEVBehaviorType} from "../../../../interfaces/api/dictionarySEVBehaviorType";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionarySEVBehaviorType
} from "../../../../stores/admin/SEVBehaviorType/storeAdminPageContentDictionarySEVBehaviorType";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface SEVBehaviorTypeItemProps extends AdminActionButtonsProps {
    sevBehaviorType: DictionarySEVBehaviorType;
}

const SEVBehaviorTypeItem = React.memo((props: SEVBehaviorTypeItemProps) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Тип поведения SEV:'}>
                {props.sevBehaviorType.sevBehaviorTypePublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.sevBehaviorType.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionarySEVBehaviorType(props: SmartComponentProps<StoreAdminPageContentDictionarySEVBehaviorType>) {
    const dataOnCurrentPage: DictionarySEVBehaviorType[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют типы поведения SEV для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <SEVBehaviorTypeItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                sevBehaviorType={dataOnCurrentPage[i]}
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

export default observer(AdminDictionarySEVBehaviorType);
