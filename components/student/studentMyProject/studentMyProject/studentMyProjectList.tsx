import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {IMyProjectMini5s} from "../../../../interfaces/api/userMyProjectList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentSendProject
} from "../../../../stores/common/pageSendProject/storeCommonPageContentSendProject";
import {CommentsItemsList} from "../../../common/commonCommentsItemsList";
import {ItemsContainer} from "../../../common/itemsContainer";
import LabelWithContainerComment from "../../../common/labelWithContainerComment/labelWithContainerComment";
import {LabelWithContainerOnOneLine} from "../../../common/labelWithContainerOnOneLine";
import {StandardPanel} from "../../../common/standardPanel";
import {StubEmptyData} from "../../../common/stubEmptyData";
import {ValidOrInvalidUrlImage} from "../../../common/validOrInvalidUrlImage";
import styles from "./studentMyProjectListStyle.scss";

interface MyProjectActionButtonsEventsProps {
    readonly eventStartEdit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly eventDeleteItem?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    readonly itemId: string;
    readonly buttonsText?: {
        readonly buttonOk: string;
        readonly buttonCancel: string;
    }
}
interface MyProjectListItemContainerProps extends MyProjectActionButtonsEventsProps {
    readonly children: React.ReactNode;
    readonly className?: string;
}

export const ActionButtons = React.memo((props: MyProjectActionButtonsEventsProps) => {
    return (
        <div className={styles.buttonsActionsContainer}>
            {
                props.eventDeleteItem ?
                    <button
                        data-id={props.itemId}
                        onClick={props.eventDeleteItem}
                        className={`${styles.buttonAction} ${styles.buttonActionDelete}`}>
                        {props.buttonsText?.buttonCancel ? props.buttonsText.buttonCancel : 'Удалить'}
                    </button> : null
            }
            {
                props.eventStartEdit ?
                    <button
                        data-id={props.itemId}
                        onClick={props.eventStartEdit}
                        className={`${styles.buttonAction} ${styles.buttonActionEdit}`}
                    >
                        {props.buttonsText?.buttonOk ? props.buttonsText?.buttonOk : 'Изменить'}
                    </button> : null
            }
        </div>
    );
});


const StudentMyProjectList = (props: SmartComponentProps<StoreCommonPageContentSendProject>, btnParam: MyProjectListItemContainerProps ) => {
    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;
    //Сортировка по дате
    dataOnCurrentPage.sort(function(a: IMyProjectMini5s, b: IMyProjectMini5s) {
        const dateA: number = a.dateCreated ? +a.dateCreated:0;
        const dateB: number = b.dateCreated ? +b.dateCreated:0;
        return dateB - dateA;
    })

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'} />
        );
    }

    const itemlsList: JSX.Element[] = dataOnCurrentPage.map(data => {
        return (
            <div key={data.uuid} className={styles.itemGrid}>
                <StandardPanel className={styles.itemContainer}>
                    <div className={styles.itemContentContainer}>
                        <LabelWithContainerOnOneLine label='Автор:'>
                            {data.authorFIO}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Название проекта:'>
                            {data.name}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Завод:'>
                            {data.factoryName}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Тип проекта:'>
                            {data.projectType}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Участок / оборудование:'>
                            {data.equipmentName}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Участники:'>
                            {data.participantName}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Дата создания:'>
                            {dateFormatForView({
                                date: data.dateCreated,
                                format: 'DD.MM.YYYY',
                                defaultValue: '-'
                            }) }
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Менеджер:'>
                            {data.managerFIO}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Подразделение:'>
                            {data.unitName}
                        </LabelWithContainerOnOneLine>
                        <LabelWithContainerOnOneLine label='Этап:'>
                            {data.stage}
                        </LabelWithContainerOnOneLine>
                        { data.commentList.length <= 0 ? null :
                        <LabelWithContainerComment label="Комментарии: ">
                            <CommentsItemsList commentsList={data.commentList} />
                        </LabelWithContainerComment>
                        }
                        <div className={styles.imgContainer}>
                            { data.photoBeforeUrl ?
                                <ValidOrInvalidUrlImage imageUrl={data.photoBeforeUrl} label='Фото до:'/>
                            : null}
                            { data.photoResultUrl ?
                                <ValidOrInvalidUrlImage imageUrl={data.photoResultUrl} label='Фото результата:'/>
                            : null}
                            { data.photoStandartUrl ?
                                <ValidOrInvalidUrlImage imageUrl={data.photoStandartUrl} label='Фото стандарта:'/>
                            : null}
                        </div>

                    </div>
                    <ActionButtons
                        itemId={data.uuid}
                        eventDeleteItem={props.store.eventStartDeleteItem}
                        eventStartEdit={data.stage !== 'Подтвержденный' ? props.store.eventStartChangeItem : undefined}
                        buttonsText={btnParam.buttonsText}
                    />
                </StandardPanel>
            </div>
        );
    })

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {itemlsList}
        </ItemsContainer>
    );
};

export default observer(StudentMyProjectList);
