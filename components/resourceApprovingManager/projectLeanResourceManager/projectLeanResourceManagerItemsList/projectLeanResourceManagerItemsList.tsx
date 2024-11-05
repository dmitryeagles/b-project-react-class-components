import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView, fixedLengthString} from "ts-common-helpers";
import {IProjectLEAN} from "../../../../interfaces/api/userMyProjectList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StorePageContentProjectResourceManagerLEAN
} from "../../../../stores/resourceApprovingManager/projectResourceApprovingManagerLEAN/storePageContentProjectResourceManagerLEAN";
import {AdminLabelWithContainerLine} from "../../../admin/adminLabelWithContainerLine";
import AdminListItemContainer, {
    AdminActionButtonsProps
} from "../../../admin/adminListItemContainer/adminListItemContainer";
import {CommentsItemsList} from "../../../common/commonCommentsItemsList";
import {DropdownSelectItem} from "../../../common/dropdownSelect/dropdownSelect";
import {ItemsContainer} from "../../../common/itemsContainer";
import LabelWithContainerComment from "../../../common/labelWithContainerComment/labelWithContainerComment";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {ValidOrInvalidUrlImage} from "../../../common/validOrInvalidUrlImage";
import styles from "./projectLeanResourceManagerItemsListStyle.scss";

interface ProjectLeanResourceManagerItemProps extends AdminActionButtonsProps {
    readonly project: IProjectLEAN;
}

interface ParticipantsItemsListProps {
    participantsList: DropdownSelectItem<string>[];
}

const ParticipantsItemsList = React.memo((props: ParticipantsItemsListProps) => {
    if (!props.participantsList.length) {
        return (<span>{'Список участников отсутствует'}</span>)
    }

    const participantsElementsList: React.ReactNode[] = [];

    for (let i = 0; i < props.participantsList.length; ++i) {
        participantsElementsList.push(
            <span
                key={props.participantsList[i].value}
                className={styles.simpleListItem}
                title={props.participantsList[i].label}
            >
                {
                    fixedLengthString({
                        maxLength: 25,
                        stringToFixed: props.participantsList[i].label
                    })
                }
            </span>
        );
    }

    return (
        <>
            {participantsElementsList}
        </>
    );
});

function ProjectLeanResourceManagerItem(props: ProjectLeanResourceManagerItemProps) {


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
            <AdminLabelWithContainerLine label={'Цель проекта: '}>
                {props.project.target}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'KPI воздействия: '}>
                {props.project.KPIName}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Описание идеи: '}>
                {props.project.descriptionIdea}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Проблема: '}>
                {props.project.problem}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label={'Участники: '}>
                <ParticipantsItemsList participantsList={props.project.participantsList}/>
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
                <LabelWithContainerComment label="Комментарии: ">
                    <CommentsItemsList commentsList={props.project.commentsList} />
                </LabelWithContainerComment>
            }
            { props.project.photoBeforeUrl ?
                <ValidOrInvalidUrlImage imageUrl={props.project.photoBeforeUrl} label='Фото до:'/>
            : null}

            <AdminLabelWithContainerLine label='Ресурсный менеджер:'>
                {props.project.resourceManagerFIO}
            </AdminLabelWithContainerLine>
            <AdminLabelWithContainerLine label='Необходимые ресурсы:'>
                {props.project.resources}
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
}

function ProjectLeanResourceManagerItemsList(props: SmartComponentProps<StorePageContentProjectResourceManagerLEAN>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'}/>)
    }

    const feedbackSEVItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        feedbackSEVItemsElements.push(
            <ProjectLeanResourceManagerItem
                key={dataOnCurrentPage[i].uuid}
                itemId={dataOnCurrentPage[i].uuid}
                project={dataOnCurrentPage[i]}
                eventStartEdit={dataOnCurrentPage[i].stage === 'Ожидание ресурсов' ? props.store.eventStartChangeItem : undefined}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {feedbackSEVItemsElements}
        </ItemsContainer>
    );
}

export default observer(ProjectLeanResourceManagerItemsList);
