import {observer} from "mobx-react";
import React from "react";
import {DictionaryNMPossibleInjury} from "../../../../interfaces/api/dictionaryNMPossibleInjury";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryNMPossibleInjury
} from "../../../../stores/admin/NMPossibleInjury/storeAdminPageContentDictionaryNMPossibleInjury";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface NMPossibleInjuryItemProps extends AdminActionButtonsProps {
    nmPossibleInjury: DictionaryNMPossibleInjury;
}

const NMPossibleInjuryItem = React.memo((props: NMPossibleInjuryItemProps) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Возможная травма NearMiss:'}>
                {props.nmPossibleInjury.nmPossibleInjuryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.nmPossibleInjury.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryNMPossibleInjury(props: SmartComponentProps<StoreAdminPageContentDictionaryNMPossibleInjury>) {
    const dataOnCurrentPage: DictionaryNMPossibleInjury[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют возможные травмы NearMiss для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <NMPossibleInjuryItem
                key = {dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                nmPossibleInjury={dataOnCurrentPage[i]}
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

export default observer(AdminDictionaryNMPossibleInjury);
