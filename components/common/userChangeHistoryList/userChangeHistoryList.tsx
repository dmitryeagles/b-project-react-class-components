import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {UserEmployeeHistoryModel} from "../../../interfaces/api/userEmployeeHistoryModel";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreUserHistory} from "../../../stores/common/storeUserHistory";
import {AdminLabelWithContainerLine} from "../../admin/adminLabelWithContainerLine";
import {AdminListItemContainer} from "../../admin/adminListItemContainer";
import {LoaderSpinner} from "../loaderSpinner";
import {StubEmptyData} from "../stubEmptyData";
import {StubErrorGetData} from "../stubErrorGetData";
import styles from "./userChangeHistoryListStyle.scss";

interface IsChangeValueIndicatorProps {
    isChange?: boolean;
    value: string;
}

const IsChangeValue = React.memo((props: IsChangeValueIndicatorProps) => {
    if (props.isChange) {
        return (
            <span
                className={styles.isChangeValue}
                title={'Запись изменена'}
            >
                {props.value}
            </span>
        );
    }

    return (
        <span>{props.value}</span>
    );
});

interface UserChangeHistoryItemProps {
    info: UserEmployeeHistoryModel;
}

const UserChangeHistoryItem = React.memo((props: UserChangeHistoryItemProps) => {
    return (
        <AdminListItemContainer
            className={styles.itemUser}
            itemId={props.info.uuid}
        >
            <AdminLabelWithContainerLine label={'Дата изменения:'}>
                {dateFormatForView({
                    date: props.info.modifiedDate,
                    format: 'DD.MM.YYYY HH:MM',
                    defaultValue: '-'
                })}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Дата трудоустройства:'}>
                <IsChangeValue
                    isChange={props.info.isChangeEmploymentDate}
                    value={
                        dateFormatForView({
                            date: new Date(props.info.employmentDate),
                            format: 'DD.MM.YYYY',
                            defaultValue: '-'
                        })
                    }
                />
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Должность:'}>
                <IsChangeValue
                    isChange={props.info.isChangePosition}
                    value={props.info.positionPublicName}
                />
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Подразделение:'}>
                <IsChangeValue
                    isChange={props.info.isChangeUnit}
                    value={props.info.unitPublicName}
                />
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                <IsChangeValue
                    isChange={props.info.isChangeFactory}
                    value={props.info.factoryPublicName}
                />
            </AdminLabelWithContainerLine>
        </AdminListItemContainer>
    );
});

function UserChangeHistoryList(props: SmartComponentProps<StoreUserHistory>) {
    if (props.store.errorGettingData) {
        return (
            <StubErrorGetData errorText={props.store.errorGettingData}/>
        );
    }

    const currentUserChangeHistory: UserEmployeeHistoryModel[] = props.store.userHistoryData;
    if (!currentUserChangeHistory) {
        return (
            <div className={styles.loaderContainer}>
                <LoaderSpinner loadingText={'Получение информации об истории изменения пользователя'}/>
            </div>
        );
    }

    if (!currentUserChangeHistory.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют данные для отображения'}/>
        );
    }

    const historyListElements: JSX.Element[] = [];

    for (let i = 0; i < currentUserChangeHistory.length; ++i) {
        historyListElements.push(
            <UserChangeHistoryItem
                key={currentUserChangeHistory[i].uuid}
                info={currentUserChangeHistory[i]}
            />
        );
    }

    return (
        <div className={styles.historyListContainer}>
            {historyListElements}
        </div>
    );
}

export default observer(UserChangeHistoryList);
