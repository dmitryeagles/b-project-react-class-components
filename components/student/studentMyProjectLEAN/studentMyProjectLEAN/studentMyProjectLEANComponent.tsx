import {observer} from "mobx-react";
import React, {useState} from "react";
import {dateFormatForView, fixedLengthString} from "ts-common-helpers/dist";
import {IMyProjectLEAN} from "../../../../interfaces/api/userMyProjectList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentSendProjectLEAN
} from "../../../../stores/common/pageSendProjectLEAN/storeCommonPageContentSendProjectLEAN";
import {CommentsItemsList} from "../../../common/commonCommentsItemsList";
import {DropdownSelectItem} from "../../../common/dropdownSelect/dropdownSelect";
import {ItemContentContainer, ItemShowHideDetailInfo} from "../../../common/itemContainer";
import LabelWithContainerComment from "../../../common/labelWithContainerComment/labelWithContainerComment";
import {LabelWithContainerOnOneLine} from "../../../common/labelWithContainerOnOneLine";
import {ValidOrInvalidUrlImage} from "../../../common/validOrInvalidUrlImage";
import styles from "./studentMyProjectLEANListStyle.scss";

interface ParticipantsItemsListProps {
    participantsList: DropdownSelectItem<string>[];
}
interface MyProjectLEANActionButtonsEventsProps {
    readonly eventStartAddResource?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventStartAddResult?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventStartCompletionNotice?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly itemUuid: string;
    readonly className?: string;
    readonly buttonsText?: {
        readonly buttonOk: string;
        readonly buttonCancel: string;
    }
}
interface ProjectInfoProps extends MyProjectLEANActionButtonsEventsProps {
    readonly projectInfo: IMyProjectLEAN;
    readonly projectStore: SmartComponentProps<StoreCommonPageContentSendProjectLEAN>
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

export const ActionButtonAddResource = React.memo((props: MyProjectLEANActionButtonsEventsProps) => {
    return (
        <div className={props.className}>
            {
                props.eventStartAddResource ?
                    <button
                        data-id={props.itemUuid}
                        onClick={props.eventStartAddResource}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                    >
                        {props.buttonsText?.buttonOk ? props.buttonsText?.buttonOk : 'Отправить запрос на ресурсы'}
                    </button> : null
            }
            {
                props.eventStartAddResult ?
                    <button
                        data-id={props.itemUuid}
                        onClick={props.eventStartAddResult}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                    >
                        {props.buttonsText?.buttonOk ? props.buttonsText?.buttonOk : 'Добавить результат'}
                    </button> : null
            }
            {
                props.eventStartCompletionNotice ?
                    <button
                        data-id={props.itemUuid}
                        onClick={props.eventStartCompletionNotice}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                    >
                        {props.buttonsText?.buttonOk ? props.buttonsText?.buttonOk : 'Завершить проект'}
                    </button> : null
            }
        </div>
    );
});


export const ProjectInfo = observer((props: ProjectInfoProps) => {
    const [isOpenProjectInfo, setOpenProjectInfo] = useState(false);
    const eventProjectInfo = () => {
        setOpenProjectInfo(!isOpenProjectInfo);
    }
    return (
        <ItemContentContainer>
            <LabelWithContainerOnOneLine label='Название проекта:'>
                {props.projectInfo.name}
            </LabelWithContainerOnOneLine>
            {props.projectInfo.stage === 'Ожидает подтверждения' || props.projectInfo.stage === 'Отправлен на доработку' ?
                <>
                    <LabelWithContainerOnOneLine label='Этап:'>
                        {props.projectInfo.stage}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Автор:'>
                        {props.projectInfo.authorFIO}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Завод:'>
                        {props.projectInfo.factoryName}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Тип проекта:'>
                        {props.projectInfo.projectType}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Участок / оборудование:'>
                        {props.projectInfo.equipmentName}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Участники:'>
                        <ParticipantsItemsList participantsList={props.projectInfo.participantsList} />
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Дата создания:'>
                        {dateFormatForView({
                            date: props.projectInfo.dateCreated,
                            format: 'DD.MM.YYYY',
                            defaultValue: '-'
                        })}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Менеджер:'>
                        {props.projectInfo.managerFIO}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Подразделение:'>
                        {props.projectInfo.unitName}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Цель проекта:'>
                        {props.projectInfo.target}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Описание идеи:'>
                        {props.projectInfo.descriptionIdea}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='KPI воздействия:'>
                        {props.projectInfo.KPIName}
                    </LabelWithContainerOnOneLine>
                    <LabelWithContainerOnOneLine label='Проблема:'>
                        {props.projectInfo.problem}
                    </LabelWithContainerOnOneLine>
                </> :
                <>
                    {isOpenProjectInfo ?
                        <>
                            <LabelWithContainerOnOneLine label='Этап:'>
                                {props.projectInfo.stage}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Автор:'>
                                {props.projectInfo.authorFIO}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Завод:'>
                                {props.projectInfo.factoryName}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Тип проекта:'>
                                {props.projectInfo.projectType}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Участок / оборудование:'>
                                {props.projectInfo.equipmentName}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Участники:'>
                                <ParticipantsItemsList participantsList={props.projectInfo.participantsList} />
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Дата создания:'>
                                {dateFormatForView({
                                    date: props.projectInfo.dateCreated,
                                    format: 'DD.MM.YYYY',
                                    defaultValue: '-'
                                })}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Менеджер:'>
                                {props.projectInfo.managerFIO}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Подразделение:'>
                                {props.projectInfo.unitName}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Цель проекта:'>
                                {props.projectInfo.target}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Описание идеи:'>
                                {props.projectInfo.descriptionIdea}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='KPI воздействия:'>
                                {props.projectInfo.KPIName}
                            </LabelWithContainerOnOneLine>
                            <LabelWithContainerOnOneLine label='Проблема:'>
                                {props.projectInfo.problem}
                            </LabelWithContainerOnOneLine>
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
            {props.projectInfo.commentsList.length <= 0 ? null :
                <LabelWithContainerComment label="Комментарии: ">
                    <CommentsItemsList commentsList={props.projectInfo.commentsList} />
                </LabelWithContainerComment>
            }
            {props.projectInfo.photoBeforeUrl ?
                <div className={styles.imgContainer}>
                    <ValidOrInvalidUrlImage imageUrl={props.projectInfo.photoBeforeUrl} label='Фото до:' />
                </div>
                : null
            }
            {props.projectInfo.stage === "Подтвержденный" || props.projectInfo.stage === "Отправлен на доработку(ресурсы)" ?
                <div>
                    <ActionButtonAddResource
                        itemUuid={props.projectInfo.uuid}
                        eventStartAddResource={props.eventStartAddResource}
                        buttonsText={props.buttonsText}
                        className={styles.buttonsActionsContainerNew}
                    />
                </div> : null
            }
            {props.projectInfo.resourceManagerFIO ?
                <LabelWithContainerOnOneLine label='Утверждающий заявку на ресурсы:'>
                    {props.projectInfo.resourceManagerFIO}
                </LabelWithContainerOnOneLine> : null
            }
            {props.projectInfo.resources ?
                <LabelWithContainerOnOneLine label='Необходимые материалы и ресурсы:'>
                    {props.projectInfo.resources}
                </LabelWithContainerOnOneLine> : null
            }

            {props.projectInfo.stage === "Интеграция" ?
                <div>
                    <span className={styles.labelResourse}>{'Завершение проекта:'}</span>
                    <ActionButtonAddResource
                        itemUuid={props.projectInfo.uuid}
                        eventStartCompletionNotice={props.eventStartCompletionNotice}
                        buttonsText={props.buttonsText}
                        className={styles.buttonsActionsContainerNew}
                    />
                </div> : null
            }

            {props.projectInfo.stage === "Законченный" ?
                <div>
                    <ActionButtonAddResource
                        itemUuid={props.projectInfo.uuid}
                        eventStartAddResult={props.eventStartAddResult}
                        buttonsText={props.buttonsText}
                        className={styles.buttonsActionsContainerNew}
                    />
                </div> : null
            }

            {props.projectInfo.result ?
                <LabelWithContainerOnOneLine label='Результаты проекта:'>
                    {props.projectInfo.result}
                </LabelWithContainerOnOneLine> : null
            }
            {props.projectInfo.photoResultUrl ?
                <LabelWithContainerOnOneLine label='Дата завершения проекта:'>
                    <span>
                        {dateFormatForView({
                            date: props.projectInfo.dateResult,
                            format: 'DD.MM.YYYY'
                        })}
                    </span>
                </LabelWithContainerOnOneLine> : null
            }
            <div className={styles.imgContainer}>
                {props.projectInfo.photoResultUrl ?
                    <ValidOrInvalidUrlImage imageUrl={props.projectInfo.photoResultUrl} label='Фото результата:' />
                    : null
                }
            </div>
        </ItemContentContainer>
    )
});
