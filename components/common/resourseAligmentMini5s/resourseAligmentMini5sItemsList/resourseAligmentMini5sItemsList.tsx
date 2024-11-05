import {observer} from "mobx-react";
import {dateFormatForView} from "ts-common-helpers";
import {IProjectMini5s} from "../../../../interfaces/api/userMyProjectList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StorePageContentProjectResourceAlignmentMini5s
} from "../../../../stores/common/pageResourceAlignmentMini5s/storePageContentProjectResourceAlignmentMini5s";
import {AdminLabelWithContainerLine} from "../../../admin/adminLabelWithContainerLine";
import AdminListItemContainer, {
    AdminActionButtonsProps
} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {ItemsContainer} from "../../itemsContainer";
import LabelWithContainerComment from "../../labelWithContainerComment/labelWithContainerComment";
import {StandardTagItem} from "../../standardTagItem";
import {StubEmptyData} from "../../stubEmptyData";
import {ValidOrInvalidUrlImage} from "../../validOrInvalidUrlImage";
import styles from "./resourseAligmentMini5sListStyle.scss";

interface ProjectAdminMini5sItemProps extends AdminActionButtonsProps {
    readonly project: IProjectMini5s;
}

function ProjectAdminMini5sItem(props: ProjectAdminMini5sItemProps) {


    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Автор:'}>
                {props.project.authorFIO}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Название проекта:'}>
                {props.project.name}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.project.factoryName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Тип проекта:'}>
                {props.project.projectType}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Участок / оборудование: '}>
                {props.project.equipmentName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Участники: '}>
                {props.project.participantName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Дата создания: '}>
                {dateFormatForView({
                    date: props.project.dateCreated,
                    format: 'DD.MM.YYYY',
                    defaultValue: '-'
                }) }
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Менеджер: '}>
                {props.project.managerFIO}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Подразделение: '}>
                {props.project.unitName}
            </AdminLabelWithContainerLine>

            { !props.project.stage ? null :
            <AdminLabelWithContainerLine label={'Этап:'}>
                <StandardTagItem
                    tagPublicName={props.project.stage}
                    publicNameMaxLength={100}
                />
            </AdminLabelWithContainerLine>
            }
            { !props.project.commentText ? null :
                <LabelWithContainerComment label="Комментарий: ">
                    {props.project.commentText}
                </LabelWithContainerComment>
            }
            <div className={styles.imgContainer}>

                    <ValidOrInvalidUrlImage imageUrl={props.project.photoBeforeUrl} label='Фото до:'/>


                    <ValidOrInvalidUrlImage imageUrl={props.project.photoResultUrl} label='Фото результата:'/>


                    <ValidOrInvalidUrlImage imageUrl={props.project.photoStandartUrl} label='Фото стандарта:'/>

            </div>

        </AdminListItemContainer>
    );
}

function ProjectAdminMini5sItemsList(props: SmartComponentProps<StorePageContentProjectResourceAlignmentMini5s>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    const feedbackSEVItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        feedbackSEVItemsElements.push(
            <ProjectAdminMini5sItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                project={dataOnCurrentPage[i]}
                eventStartEdit={dataOnCurrentPage[i].stage === 'Ожидает подтверждения' ? props.store.eventStartChangeItem : undefined}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {feedbackSEVItemsElements}
        </ItemsContainer>
    );
}

export default observer(ProjectAdminMini5sItemsList);
