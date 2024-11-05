import {observer} from "mobx-react";
import React from "react";
import {DictionaryKPICategory} from "../../../../interfaces/api/dictionaryKPICategory";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryKPICategory
} from "../../../../stores/admin/KPICategory/storeAdminPageContentDictionaryKPICategory";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from "./adminDictionaryKPICategoryStyle.scss";

interface KPICategoryItemProps extends AdminActionButtonsProps {
    kpiCategory: DictionaryKPICategory;
}

const KPICategoryItem = React.memo((props: KPICategoryItemProps) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Категория KPI:'}
                classNameLabelIco={styles.icoChart}
            >
                {props.kpiCategory.kpiCategoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine
                label={'Завод:'}
                classNameLabelIco={styles.icoFactory}
            >
                {props.kpiCategory.factoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function AdminDictionaryKPICategory(props: SmartComponentProps<StoreAdminPageContentDictionaryKPICategory>) {

    const dataOnCurrentPage: DictionaryKPICategory[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют категории KPI для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <KPICategoryItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                kpiCategory={dataOnCurrentPage[i]}
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

export default observer(AdminDictionaryKPICategory);
