import {observer} from "mobx-react";
import React, {useState} from "react";
import {AdminFeedbackNM} from "../../../../interfaces/api/adminFeedbackNM";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentFeedbackNM} from "../../../../stores/admin/feedbackNM/storeAdminPageContentFeedbackNM";
import {
    StoreSafetySpecialistPageContentFeedbackNM
} from "../../../../stores/safetySpecialist/feedbackNM/storeSafetySpecialistPageContentFeedbackNM";
import {FeedbackNMTemplateReadOnly} from "../../../common/feedbackNMTemplateReadOnly";
import {ItemShowHideDetailInfo} from "../../../common/itemContainer";
import {ItemsContainer} from "../../../common/itemsContainer";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";

interface AdminFeedbackNMItemProps extends AdminActionButtonsProps {
    readonly feedbackNM: AdminFeedbackNM;
}

function AdminFeedbackNMItem(props: AdminFeedbackNMItemProps) {

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
                {props.feedbackNM.authorFullName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.feedbackNM.factoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Подразделение:'}>
                {props.feedbackNM.userUnit}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Статус:'}>
                <StandardTagItem
                    tagPublicName={props.feedbackNM.statusPublicName}
                    publicNameMaxLength={100}
                />
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Шаблон:'}>
                {props.feedbackNM.nmTemplateName}
            </AdminLabelWithContainerLine>

            {
                isOpenDetailInfo ?<FeedbackNMTemplateReadOnly
                    template={props.feedbackNM.template}
                /> : null
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

function AdminFeedbackNMItemsList(props: SmartComponentProps<StoreAdminPageContentFeedbackNM |  StoreSafetySpecialistPageContentFeedbackNM>) {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {
                dataOnCurrentPage.map((item) => <AdminFeedbackNMItem
                    key={item.uuid}
                    itemId={item.uuid}
                    feedbackNM={item}
                    eventDeleteItem={props.store.eventStartDeleteItem}
                    eventStartEdit={props.store.eventStartChangeItem}
                />)
            }
        </ItemsContainer>
    );
}

export default observer(AdminFeedbackNMItemsList);
