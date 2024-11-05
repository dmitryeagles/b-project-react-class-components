import {observer} from "mobx-react";
import React, {useState} from "react";
import {dateFormatForView, fixedLengthString} from "ts-common-helpers";
import {IProjectLEAN} from "../../../../interfaces/api/userMyProjectList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StorePageContentProjectAdminLEAN
} from "../../../../stores/admin/projectAdminLEAN/storePageContentProjectAdminLEAN";
import {CommentsItemsList} from "../../../common/commonCommentsItemsList";
import {DropdownSelectItem} from "../../../common/dropdownSelect/dropdownSelect";
import {ItemShowHideDetailInfo} from "../../../common/itemContainer";
import {ItemsContainer} from "../../../common/itemsContainer";
import LabelWithContainerComment from "../../../common/labelWithContainerComment/labelWithContainerComment";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {ValidOrInvalidUrlImage} from "../../../common/validOrInvalidUrlImage";
import {AdminLabelWithContainerLine} from "../../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../adminListItemContainer";
import {AdminActionButtonsProps} from "../../adminListItemContainer/adminListItemContainer";
import styles from "./projectAdminLEANItemsListStyle.scss";

interface ProjectAdminLEANItemProps extends AdminActionButtonsProps {
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

function ProjectAdminLEANItem(props: ProjectAdminLEANItemProps) {
    const [isOpenProjectInfo, setOpenProjectInfo] = useState(false);

    const eventProjectInfo = () => {
        setOpenProjectInfo(!isOpenProjectInfo);
    }

    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <AdminLabelWithContainerLine label={'Название проекта:'}>
                {props.project.name}
            </AdminLabelWithContainerLine>
            {props.project.stage === 'Ожидает подтверждения' ?
                <>
                    <AdminLabelWithContainerLine label={'Автор:'}>
                        {props.project.authorFIO}
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
                        <ParticipantsItemsList participantsList={props.project.participantsList} />
                    </AdminLabelWithContainerLine>
                    <AdminLabelWithContainerLine label={'Дата создания: '}>
                        {dateFormatForView({
                            date: props.project.dateCreated,
                            format: 'DD.MM.YYYY',
                            defaultValue: '-'
                        })}
                    </AdminLabelWithContainerLine>
                    <AdminLabelWithContainerLine label={'Менеджер: '}>
                        {props.project.managerFIO}
                    </AdminLabelWithContainerLine>
                    <AdminLabelWithContainerLine label={'Подразделение: '}>
                        {props.project.unitName}
                    </AdminLabelWithContainerLine>

                    {!props.project.stage ? null :
                        <AdminLabelWithContainerLine label={'Этап:'}>
                            <StandardTagItem
                                tagPublicName={props.project.stage}
                                publicNameMaxLength={100}
                            />
                        </AdminLabelWithContainerLine>
                    }
                </> :
                <>
                    {isOpenProjectInfo ?
                        <>
                            <AdminLabelWithContainerLine label={'Автор:'}>
                                {props.project.authorFIO}
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
                                <ParticipantsItemsList participantsList={props.project.participantsList} />
                            </AdminLabelWithContainerLine>
                            <AdminLabelWithContainerLine label={'Дата создания: '}>
                                {dateFormatForView({
                                    date: props.project.dateCreated,
                                    format: 'DD.MM.YYYY',
                                    defaultValue: '-'
                                })}
                            </AdminLabelWithContainerLine>
                            <AdminLabelWithContainerLine label={'Менеджер: '}>
                                {props.project.managerFIO}
                            </AdminLabelWithContainerLine>
                            <AdminLabelWithContainerLine label={'Подразделение: '}>
                                {props.project.unitName}
                            </AdminLabelWithContainerLine>

                            {!props.project.stage ? null :
                                <AdminLabelWithContainerLine label={'Этап:'}>
                                    <StandardTagItem
                                        tagPublicName={props.project.stage}
                                        publicNameMaxLength={100}
                                    />
                                </AdminLabelWithContainerLine>
                            }
                        </> : null
                    }
                    <ItemShowHideDetailInfo
                        isOpen={isOpenProjectInfo}
                        eventToggleOpenClose={eventProjectInfo}
                        publicTextClose={'Показать детальную информацию'}
                        publicTextOpen={'Свернуть детальную информацию'}
                    />
                </>
            }
            {!props.project.commentText ? null :
                <LabelWithContainerComment label="Комментарии: ">
                    <CommentsItemsList commentsList={props.project.commentsList} />
                </LabelWithContainerComment>
            }
            {props.project.photoBeforeUrl ?
                <ValidOrInvalidUrlImage imageUrl={props.project.photoBeforeUrl} label='Фото до:' />
                : null}




            {props.project.resourceManagerFIO ?
                <AdminLabelWithContainerLine label='Утверждающий заявку на ресурсы:'>
                    {props.project.resourceManagerFIO}
                </AdminLabelWithContainerLine> : null
            }
            {props.project.resources ?
                <AdminLabelWithContainerLine label='Необходимые материалы и ресурсы:'>
                    {props.project.resources}
                </AdminLabelWithContainerLine> : null
            }


            {props.project.result ?
                <AdminLabelWithContainerLine label='Результаты проекта:'>
                    {props.project.result}
                </AdminLabelWithContainerLine> : null
            }
            {props.project.photoResultUrl ?
                <AdminLabelWithContainerLine label='Дата завершения проекта:'>
                    <span>
                        {dateFormatForView({
                            date: props.project.dateResult,
                            format: 'DD.MM.YYYY'
                        })}
                    </span>
                </AdminLabelWithContainerLine> : null
            }

            {props.project.photoResultUrl ?
                <ValidOrInvalidUrlImage imageUrl={props.project.photoResultUrl} label='Фото результата:' />
                : null
            }
        </AdminListItemContainer>
    );
}

function ProjectAdminLEANItemsList(props: SmartComponentProps<StorePageContentProjectAdminLEAN>) {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (<StubEmptyData emptyDataText={'Нет доступных данных для отображения'} />)
    }

    const feedbackSEVItemsElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        feedbackSEVItemsElements.push(
            <ProjectAdminLEANItem
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

export default observer(ProjectAdminLEANItemsList);
