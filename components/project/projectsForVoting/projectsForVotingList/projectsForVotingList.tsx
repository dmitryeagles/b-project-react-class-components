import {observer} from "mobx-react";
import React, {useCallback, useState} from "react";
import {dateFormatForView} from "ts-common-helpers";
import {ProjectParticipant, ProjectPhoto} from "../../../../interfaces/api/projectBase";
import {ProjectForVoting} from "../../../../interfaces/api/projectForVoting";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    RememberProjectVoteWithoutPhotoOptions,
    StoreCommonPageContentProjectVote
} from "../../../../stores/common/pageProjecVote/storeCommonPageContentProjectVote";
import {AdminLabelWithContainerLine} from "../../../admin/adminLabelWithContainerLine";
import {
    EditableItemLargeButton,
    ItemContainer,
    ItemContentContainer,
    ItemShowHideDetailInfo,
    ItemTitle
} from "../../../common/itemContainer";
import {StandardTagItem} from "../../../common/standardTagItem";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {ProjectImagesSlider} from "../../projectImagesSlider";
import {ProjectItemsContainerSmart} from "../../projectItemsContainer";
import styles from './projectsForVotingListStyle.scss';


interface ParticipantsListProps {
    readonly participantsList: ProjectParticipant[];
}

const ParticipantsList = React.memo((props: ParticipantsListProps) => {
    return (
        <>
            {props.participantsList.map(item =>
                <StandardTagItem
                    key={item.uuid}
                    publicNameMaxLength={40}
                    tagPublicName={item.participantFullName}/>
            )}
        </>
    );
});


interface ItemProps {
    readonly project: ProjectForVoting;
    readonly currentAuthUserId: string;
    readonly eventStartEdit: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly eventShowVotesHistory: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    readonly rememberProjectWithoutPhoto:(inputOptions: RememberProjectVoteWithoutPhotoOptions)=> void;
}

const LargeButtonVoting = React.memo((props: ItemProps) => {
    if (props.project.idUsersWhoVoted.hasOwnProperty(props.currentAuthUserId)) {
        return (
            <EditableItemLargeButton
                buttonText={'Ваша оценка учтена, показать оценки'}
                status={'success'}
                linkOrEvent={props.eventShowVotesHistory}
                itemUuid={props.project.uuid}
            />
        );
    }

    if (props.project.stage === 'Closed') {
        return (
            <EditableItemLargeButton
                buttonText={'Проект закрыт, показать оценки'}
                status={'error'}
                linkOrEvent={props.eventShowVotesHistory}
                itemUuid={props.project.uuid}
            />
        );
    }

    return (
        <EditableItemLargeButton
            buttonText={'Оценить проект'}
            linkOrEvent={props.eventStartEdit}
            itemUuid={props.project.uuid}
        />
    );
});

const ItemProject = React.memo((props: ItemProps) => {
    const [isOpenDetailInfo, setOpenDetailInfo] = useState(false);

    const eventErrorLoadImage = useCallback((image: ProjectPhoto) => {
        props.rememberProjectWithoutPhoto({
            projectUuid: props.project.uuid,
            photoUuid: image.uuid
        });
    }, [props.project.uuid]);

    const eventToggleOpenClose = () => {
        setOpenDetailInfo(!isOpenDetailInfo);
    }

    return (
        <ItemContainer>
            <ItemContentContainer>
                <ItemTitle title={props.project.projectPublicName}/>
                <div className={styles.contentWrapper}>
                    <div className={styles.imageWrapper}>
                        <ProjectImagesSlider
                            className={styles.imageSlider}
                            images={[props.project.photoResult, props.project.photoBefore]}
                            callbackErrorLoadImage={eventErrorLoadImage}
                        />
                    </div>
                    <div className={styles.dataWrapper}>
                        <AdminLabelWithContainerLine label={'Автор:'}>
                            {props.project.author.authorFullName}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Завод:'}>
                            {props.project.factoryPublicName}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Участок / оборудование: '}>
                            {props.project.equipment.equipmentPublicName}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Цель проекта: '}>
                            {props.project.target}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Дата создания: '}>
                            {dateFormatForView({
                                date: props.project.createdDate,
                                format: 'DD.MM.YYYY',
                                defaultValue: '-'
                            })}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Менеджер: '}>
                            {props.project.manager.managerFullName}
                        </AdminLabelWithContainerLine>
                        <AdminLabelWithContainerLine label={'Подразделение: '}>
                            {props.project.unitPublicName}
                        </AdminLabelWithContainerLine>

                        {
                            isOpenDetailInfo ?
                                <>
                                    <AdminLabelWithContainerLine label={'KPI воздействия: '}>
                                        {props.project.kpiProject.kpiPublicName}
                                    </AdminLabelWithContainerLine>

                                    {
                                        props.project.resourceManager ?
                                            <AdminLabelWithContainerLine label={'Менеджер ресурсов: '}>
                                                {props.project.resourceManager.resourceManagerFullName}
                                            </AdminLabelWithContainerLine> : null
                                    }

                                    <AdminLabelWithContainerLine label={'Описание идеи: '}>
                                        {props.project.descriptionIdea}
                                    </AdminLabelWithContainerLine>

                                    <AdminLabelWithContainerLine label={'Проблема: '}>
                                        {props.project.problem}
                                    </AdminLabelWithContainerLine>

                                    <AdminLabelWithContainerLine label={'Участники: '}>
                                        <ParticipantsList participantsList={props.project.participants}/>
                                    </AdminLabelWithContainerLine>
                                </> : null
                        }
                        <ItemShowHideDetailInfo
                            isOpen={isOpenDetailInfo}
                            eventToggleOpenClose={eventToggleOpenClose}
                            publicTextClose={'Показать детальную информацию'}
                            publicTextOpen={'Свернуть детальную информацию'}
                        />
                    </div>
                </div>
            </ItemContentContainer>
            <LargeButtonVoting {...props}/>
        </ItemContainer>
    );
});

function ProjectsForVotingList(props: SmartComponentProps<StoreCommonPageContentProjectVote>) {
    const projectsList: ProjectForVoting[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!projectsList.length) {
        return <StubEmptyData emptyDataText={'Отсутствуют доступные проекты для отображения'}/>
    }

    return (
        <ProjectItemsContainerSmart
            storeDisplayType={props.store.storeSelectViewCatalog}
        >
            {projectsList.map((item) =>
                <ItemProject
                    key={item.uuid}
                    project={item}
                    currentAuthUserId={props.store.currentAuthUserId}
                    eventShowVotesHistory={props.store.eventShowVotesHistory}
                    eventStartEdit={props.store.eventStartChangeItem}
                    rememberProjectWithoutPhoto={props.store.rememberProjectWithoutPhoto}
                />)}
        </ProjectItemsContainerSmart>
    );
}

export default observer(ProjectsForVotingList);
