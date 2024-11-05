import {observer} from "mobx-react";
import React from "react";
import {DictionaryKPI} from "../../../../../interfaces/api/dictionaryKPI";
import {SmartComponentProps} from "../../../../../interfaces/smartComponentProps";
import {KPI_FEEDBACK_TYPE, KPIFeedbackType} from "../../../../../staticData/KPIFeedbackType";
import {KPI_TYPES} from "../../../../../staticData/KPIType";
import {StoreAdminPageContentDictionaryKPI} from "../../../../../stores/admin/KPI/storeAdminPageContentDictionaryKPI";
import {DropdownSelectItem} from "../../../../common/dropdownSelect/dropdownSelect";
import {ItemsContainer} from "../../../../common/itemsContainer";
import {StandardTagItem} from "../../../../common/standardTagItem";
import {StubEmptyData} from "../../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../../adminListItemContainer/adminListItemContainer";

//region Должности
interface PositionsListProps {
    readonly positionsList: DropdownSelectItem[];
}

const PositionsList = React.memo((props: PositionsListProps) => {
    if (!props.positionsList.length) {
        return (<span>{'Должности не заданы'}</span>);
    }

    const positionsElements: JSX.Element[] = [];

    for (let i = 0; i < props.positionsList.length; ++i) {
        positionsElements.push(
            <StandardTagItem
                key={props.positionsList[i].value}
                publicNameMaxLength={30}
                tagPublicName={props.positionsList[i].label}
            />
        );
    }

    return (
        <>
            {positionsElements}
        </>
    );
});

//endregion

interface FeedbackTypeProps {
   readonly feedbackType: KPIFeedbackType | undefined;
}

const FeedbackType = React.memo((props: FeedbackTypeProps)=> {

    if(!props.feedbackType) {
        return(<span>{'Нет'}</span>);
    }

    if(KPI_FEEDBACK_TYPE.hasOwnProperty(props.feedbackType)){
        return(<span>{KPI_FEEDBACK_TYPE[props.feedbackType].label}</span>);
    }

    return(<span>{'Нет'}</span>);
});


interface AdminDictionaryKPIItemProps extends AdminActionButtonsProps {
    KPI: DictionaryKPI;
}

const AdminDictionaryKPIItem = React.memo((props: AdminDictionaryKPIItemProps) => {

    let kpiTypePublicName: string = 'Тип KPI не задан';
    if (props.KPI.kpiType) {
        if (KPI_TYPES.hasOwnProperty(props.KPI.kpiType)) {
            kpiTypePublicName = KPI_TYPES[props.KPI.kpiType].label;
        }
    }

    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Название KPI:'}>
                {props.KPI.kpiPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.KPI.factoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Целевое значение:'}>
                {props.KPI.targetValue}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Вес по умолчанию:'}>
                {props.KPI.defaultScore}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Метод сравнения текущего значения с целевым:'}>
                {props.KPI.targetComparisonPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Учитывать динамическую формулу:'}>
                <span>
                    {props.KPI.progressive ? 'Да' : 'Нет'}
                </span>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Учитывать Sev/NM/Проект:'}>
                <FeedbackType feedbackType={props.KPI.feedbackType}/>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Тип KPI:'}>
                {kpiTypePublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Должности:'}>
                <PositionsList positionsList={props.KPI.positionsList}/>
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Категория KPI:'}>
                {props.KPI.kpiCategoryPublicName}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});


function AdminDictionaryKPIItemsList(props: SmartComponentProps<StoreAdminPageContentDictionaryKPI>) {

    const dataOnCurrentPage: DictionaryKPI[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных KPI для отображения'}/>);
    }

    const KPIElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        KPIElements.push(
            <AdminDictionaryKPIItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                KPI={dataOnCurrentPage[i]}
                eventStartEdit={props.store.eventStartChangeItem}
                eventDeleteItem={props.store.eventStartDeleteItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {KPIElements}
        </ItemsContainer>
    );
}


export default observer(AdminDictionaryKPIItemsList)
