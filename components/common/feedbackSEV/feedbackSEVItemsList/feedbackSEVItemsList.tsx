import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {UserSevItem} from "../../../../interfaces/api/userSevGetList";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreCommonPageContentFeedbackSEV
} from "../../../../stores/common/pageFeedbackSEV/storeCommonPageContentFeedbackSEV";
import {ItemsContainer} from "../../itemsContainer";
import {LabelWithContainerOnOneLine} from "../../labelWithContainerOnOneLine";
import {StandardPanel} from "../../standardPanel";
import {StubEmptyData} from "../../stubEmptyData";
import styles from "./feedbackSEVItemsListStyle.scss";

type Extractor = (data: UserSevItem) => string | null;

const listItemJsx: (data: UserSevItem, label: string, prop: Extractor, index: number) => JSX.Element | null = (data, label, prop, index) => {
    const value: string | null = prop(data);

    if (value == null || value.length == 0) {
        return null;
    }

    return (
        <LabelWithContainerOnOneLine
            label={label}
            key={index}
        >
            {value}
        </LabelWithContainerOnOneLine>
    );
}

const labels: [string, Extractor][] = [
    ['Дата создания:', (data: UserSevItem) => data.creationDate  ?  dateFormatForView({
        date: data.creationDate,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    }) : null],
    ['Дата:', (data: UserSevItem) => data.date  ?  dateFormatForView({
        date: data.date,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    }) : null],
    ['Наблюдатель:', (data: UserSevItem) => data.watcher],
    ['Ответственный за выполнение, либо кто выполнил:', (data: UserSevItem) => data.responsibleName],
    ['Подразделение наблюдателя:', (data: UserSevItem) => data.unit],
    ['Участок:', (data: UserSevItem) => data.sevAreaName],
    ['Наблюдаемый:', (data: UserSevItem) => data.observableName],
    ['Наблюдаемый (справочник):', (data: UserSevItem) => data.sevObservableCatalogName],
    ['Наблюдение:', (data: UserSevItem) => data.observation],
    ['Тип наблюдения:', (data: UserSevItem) => data.sevObservationTypeName],
    ['Тип поведения:', (data: UserSevItem) => data.sevBehaviorTypeName],
    ['Вид наблюдения:', (data: UserSevItem) => data.sevObservationKindName],
    ['Вид Sev:', (data: UserSevItem) => data.sevKindName],
    ['Степень риска:', (data: UserSevItem) => data.sevRiskDegreeCatalogName],
    ['Действие:', (data: UserSevItem) => data.action],
    ['Операция:', (data: UserSevItem) => data.operation],
    ['Исполнитель:', (data: UserSevItem) => data.executorName],
    ['Сроки выполнения:', (data: UserSevItem) => data.deadLine2 ? dateFormatForView({
        date: data.deadLine2,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    }) : null],
    ['Сроки исполнения:', (data: UserSevItem) => data.deadLine ? dateFormatForView({
        date: data.deadLine,
        format: 'DD.MM.YYYY',
        defaultValue: '-'
    }) : null],
    ['Причина небезопасного поведения:', (data: UserSevItem) => data.reason],
    ['Ответственный за проверку:', (data: UserSevItem) => data.responsibleForCheckingName],
    ['Статус:', (data: UserSevItem) => data.statusName ?? null],
]

const FeedbackSEVItemsList = (props: SmartComponentProps<StoreCommonPageContentFeedbackSEV>) => {

    const dataOnCurrentPage = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Нет доступных данных для отображения'} />
        );
    }

    const itemsList: JSX.Element[] = dataOnCurrentPage.map(data => {
        return (
            <StandardPanel className={styles.sevItemContainer} key={data.uuid}>
                <div className={styles.sevItemContentContainer}>
                    {labels.map(([label, prop], index) => listItemJsx(data, label, prop, index)).filter(e => e != null)}

                    {data.comment.length > 0 ?
                        <div className={styles.commentTextContainer}>
                            <span className={styles.commentTextLabel}>
                                <span>
                                    {'Комментарий: '}
                                </span>
                                <span className={styles.commentTextLabelIco}>!</span>
                            </span>
                            <div/>
                                {data.comment}
                            </div> : null
                    }
                </div>
                {data.statusId === 3 ?
                    <span
                        className={`${styles.bottomButton} ${styles.linkNewSev}`}
                        data-id={data.uuid}
                        onClick={props.store.eventStartChangeItem}
                    >
                        {'Дополнить обращение'}
                    </span> : null
                }
            </StandardPanel>
        );
    })

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {itemsList}
        </ItemsContainer>
    );
};

export default observer(FeedbackSEVItemsList);
