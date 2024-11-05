import {observer} from "mobx-react";
import React from "react";
import {DictionaryKPIImpactsCategory} from "../../../../interfaces/api/dictionaryKPIImpactsCategory";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentDictionaryKPIImpactsCategory
} from "../../../../stores/admin/KPIImpactsCategory/storeAdminPageContentDictionaryKPIImpactsCategory";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from "./adminDictionaryKPIImpactsCategoryStyle.scss";

interface KPIImpactsCategoryItemProps extends AdminActionButtonsProps {
    kpiCategory: DictionaryKPIImpactsCategory;
}

const KPIImpactsCategoryItem = React.memo((props: KPIImpactsCategoryItemProps) => {
    return(
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine
                label={'Категория KPI воздействия:'}
                classNameLabelIco={styles.icoChart}
            >
                {props.kpiCategory.kpiProjectsPublicName}
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

function AdminDictionaryKPIImpactsCategory(props: SmartComponentProps<StoreAdminPageContentDictionaryKPIImpactsCategory>) {

    const dataOnCurrentPage: DictionaryKPIImpactsCategory[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют категории KPI для отображения'}/>
        );
    }

    const dictionaryListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        dictionaryListElements.push(
            <KPIImpactsCategoryItem
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

export default observer(AdminDictionaryKPIImpactsCategory);
