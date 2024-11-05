import {observer} from "mobx-react";
import React from "react";
import {DictionaryLevel} from "../../../../interfaces/api/dictionaryLevel";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryLevel
} from "../../../../stores/admin/levels/storeAdminPageContentDictionaryLevel";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import AdminListItemContainer, {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminDictionaryLevelsStyle.scss';

interface AdminDictionaryLevelsItemProps extends AdminActionButtonsProps {
    level: DictionaryLevel;
}

const AdminDictionaryLevelsItem = React.memo((props: AdminDictionaryLevelsItemProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Название:'}
                classNameLabelIco={styles.icoLevelName}
            >
                {props.level.levelPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Приоритет:'}
                classNameLabelIco={styles.icoPriority}
            >
                {props.level.priority}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Завод:'}
                classNameLabelIco={styles.icoFactory}
            >
                {props.level.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryLevels(props: SmartComponentProps<StoreAdminPageContentDictionaryLevel>) {
    const dataOnCurrentPage: DictionaryLevel[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют уровни для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <AdminDictionaryLevelsItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                level={dataOnCurrentPage[i]}
                eventDeleteItem={props.store.eventStartDeleteItem}
                eventStartEdit={props.store.eventStartChangeItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {dictionaryListElements}
        </ItemsContainer>
    );
}

export default observer(AdminDictionaryLevels);
