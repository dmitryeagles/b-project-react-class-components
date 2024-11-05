import {observer} from "mobx-react";
import React, {useState} from "react";
import {AdminFeedbackSEV} from "../../../../interfaces/api/adminFeedbackSEV";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentFeedbackSEV} from "../../../../stores/admin/feedbackSEV/storeAdminPageContentFeedbackSEV";
import {
    StoreSafetySpecialistPageContentFeedbackSEV
} from "../../../../stores/safetySpecialist/feedbackSEV/storeSafetySpecialistPageContentFeedbackSEV";
import {FeedbackSEVTemplateReadOnly} from "../../../common/feedbackSEVTemplateReadOnly";
import {ItemShowHideDetailInfo} from "../../../common/itemContainer";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface AdminFeedbackSEVItemProps extends AdminActionButtonsProps {
    readonly feedbackSEV: AdminFeedbackSEV;
}

function AdminFeedbackSEVItem(props: AdminFeedbackSEVItemProps) {
    const [isOpenDetailInfo, setOpenDetailInfo] = useState(false);

    const eventToggleOpenClose = () => {
        setOpenDetailInfo(!isOpenDetailInfo);
    };

    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Автор обращения:'}>
                {props.feedbackSEV.authorFullName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.feedbackSEV.factoryPublicName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Статус:'}>
                <StandardTagItem
                    tagPublicName={props.feedbackSEV.statusPublicName}
                    publicNameMaxLength={100}
                />
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Шаблон:'}>
                {props.feedbackSEV.sevTemplateName}
            </AdminLabelWithContainerLine>
            {
                isOpenDetailInfo ?
                    <FeedbackSEVTemplateReadOnly template={props.feedbackSEV.template}/> : null
            }
            <ItemShowHideDetailInfo
                isOpen={isOpenDetailInfo}
                eventToggleOpenClose={eventToggleOpenClose}
                publicTextClose={'Показать детальную информацию'}
                publicTextOpen={'Свернуть детальную информацию'}
            />
        </AdminListItemContainer>
    );
}

function AdminFeedbackSEVItemsList(props: SmartComponentProps<StoreAdminPageContentFeedbackSEV | StoreSafetySpecialistPageContentFeedbackSEV>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    const feedbackSEVItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        feedbackSEVItemsElements.push(
            <AdminFeedbackSEVItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                feedbackSEV={dataOnCurrentPage[i]}
                eventDeleteItem={props.store.eventStartDeleteItem}
                eventStartEdit={props.store.eventStartChangeItem}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {feedbackSEVItemsElements}
        </ItemsContainer>
    );
}

export default observer(AdminFeedbackSEVItemsList);
