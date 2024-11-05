import {observer} from "mobx-react";
import React from "react";
import {DictionarySubdivision} from "../../../../interfaces/api/dictionarySubdivision";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionarySubdivision
} from "../../../../stores/admin/subdivision/storeAdminPageContentDictionarySubdivision";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from './adminDictionarySubdivisionStyle.scss';

interface SubdivisionItemProps extends AdminActionButtonsProps {
    subdivision: DictionarySubdivision;
}

const SubdivisionItem = React.memo((props: SubdivisionItemProps) => {
    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Подразделение:'}
                classNameLabelIco={styles.icoUsers}
            >
                {props.subdivision.subdivisionPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Завод:'}
                classNameLabelIco={styles.icoFactory}
            >
                {props.subdivision.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});


function AdminDictionarySubdivision(props: SmartComponentProps<StoreAdminPageContentDictionarySubdivision>) {
    const dataOnCurrentPage: DictionarySubdivision[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Отсутствуют подразделения для отображения'}/>);
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <SubdivisionItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                subdivision={dataOnCurrentPage[i]}
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

export default observer(AdminDictionarySubdivision);
