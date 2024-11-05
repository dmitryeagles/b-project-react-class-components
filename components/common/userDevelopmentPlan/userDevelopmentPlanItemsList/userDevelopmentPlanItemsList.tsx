import { observer } from "mobx-react";
import React, { useState } from "react";
import { UserDevelopmentPlanList } from "../../../../interfaces/api/userDevelopmentPlanList";
import { SmartComponentProps } from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentUserDevelopmentPlan
} from "../../../../stores/common/pageUserDevelopmentPlan/storeCommonPageContentUserDevelopmentPlan";
import { AdminListItemContainer } from "../../../admin/adminListItemContainer";
import { AdminActionButtonsProps } from "../../../admin/adminListItemContainer/adminListItemContainer";
import { ItemShowHideDetailInfo } from "../../itemContainer";
import { ItemsContainer } from "../../itemsContainer";
import { LabelWithContainerOnOneLine } from "../../labelWithContainerOnOneLine";
import { LabelWithContainerOnTwoLine } from "../../labelWithContainerOnTwoLine";
import StandardTagItem from "../../standardTagItem/standardTagItem";
import { StubEmptyData } from "../../stubEmptyData";
import styles from "./userDevelopmentPlanItemsListStyle.scss";


interface UserDevelopmentPlanItemsProps extends AdminActionButtonsProps {
    readonly nmItem: UserDevelopmentPlanList;
}

const UserDevelopmentPlanItems = React.memo((props: UserDevelopmentPlanItemsProps) => {

    const [isOpenFullDescription, setOpenFullDescription] = useState(false);
    const eventOpenFullDescription = () => {
        setOpenFullDescription(!isOpenFullDescription);
    }

    return (
        <AdminListItemContainer
            itemId={props.itemId}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <LabelWithContainerOnOneLine
                label={'Год:'}
            >
                {props.nmItem.year}
            </LabelWithContainerOnOneLine>

            <LabelWithContainerOnOneLine
                label={'Направление плана развития:'}
            >
                {props.nmItem.careerTarget}
            </LabelWithContainerOnOneLine>

            {props.nmItem.localCourses.length ?
                <LabelWithContainerOnTwoLine
                    label={"Список курсов локальной академии:"}
                >
                    {isOpenFullDescription ?
                        <div className={styles.coursesContainer}>
                            {
                                props.nmItem.localCourses.map((i) => {
                                    return (
                                        <div className={styles.coursesItem} key={i.id}>
                                            <LabelWithContainerOnOneLine
                                                label={'Способ:'}
                                            >
                                                {i.method}
                                            </LabelWithContainerOnOneLine>
                                            <LabelWithContainerOnOneLine
                                                label={'Наименование:'}
                                            >
                                                {i.name}
                                            </LabelWithContainerOnOneLine>

                                            <LabelWithContainerOnOneLine
                                                label={'Комментарий:'}
                                            >
                                                {i.comment}
                                            </LabelWithContainerOnOneLine>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : null}
                    {!isOpenFullDescription ?

                        props.nmItem.localCourses.map((i) =>
                            <StandardTagItem
                                publicNameMaxLength={50}
                                tagPublicName={i.name}
                                key={i.uuid}
                            />
                        ) : null
                    }
                </LabelWithContainerOnTwoLine>
                : null}
                {props.nmItem.externalCourses.length ?
                <LabelWithContainerOnTwoLine
                    label={"Список внешних курсов:"}
                >
                    {isOpenFullDescription ?
                        <div className={styles.coursesContainer}>
                            {
                                props.nmItem.externalCourses.map((i) => {
                                    return (
                                        <div className={styles.coursesItem} key={i.id}>
                                            <LabelWithContainerOnOneLine
                                                label={'Способ:'}
                                            >
                                                {i.method}
                                            </LabelWithContainerOnOneLine>
                                            <LabelWithContainerOnOneLine
                                                label={'Наименование:'}
                                            >
                                                {i.name}
                                            </LabelWithContainerOnOneLine>

                                            <LabelWithContainerOnOneLine
                                                label={'Комментарий:'}
                                            >
                                                {i.comment}
                                            </LabelWithContainerOnOneLine>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : null}
                    {!isOpenFullDescription ?

                        props.nmItem.externalCourses.map((i) =>
                            <StandardTagItem
                                publicNameMaxLength={50}
                                tagPublicName={i.name}
                                key={i.uuid}
                            />
                        ) : null
                    }

                    <ItemShowHideDetailInfo
                        isOpen={isOpenFullDescription}
                        eventToggleOpenClose={eventOpenFullDescription}
                        publicTextClose={'Подробное описание курсов'}
                        publicTextOpen={'Скрыть подробное описание'}
                    />
                </LabelWithContainerOnTwoLine>
                : null}
        </AdminListItemContainer>
    )
});

const UserDevelopmentPlanItemsList = (props: SmartComponentProps<StoreCommonPageContentUserDevelopmentPlan>) => {
    const dataOnCurrentPage: UserDevelopmentPlanList[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'} />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {
                dataOnCurrentPage.map(nmItem =>
                    <UserDevelopmentPlanItems
                        key={nmItem.uuid}
                        itemId={nmItem.uuid}
                        nmItem={nmItem}
                        eventDeleteItem={props.store.eventStartDeleteItem}
                        eventStartEdit={props.store.eventStartChangeItem}
                    />)
            }
        </ItemsContainer>
    );
};

export default observer(UserDevelopmentPlanItemsList);
