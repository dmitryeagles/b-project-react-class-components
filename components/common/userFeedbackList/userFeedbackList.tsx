import {observer} from "mobx-react";
import React from "react";
import {UserFeedbackProgressCommon} from "../../../interfaces/api/userFeedback";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreFeedbackInfo} from "../../../stores/common/storeFeedbackInfo";
import {LoaderSpinner} from "../loaderSpinner";
import {StubErrorGetData} from "../stubErrorGetData";
import UserFeedbackProgress from "../userFeedbackProgress/userFeedbackProgress";
import styles from "./userFeedbackListStyle.scss";

function UserFeedbackList(props: SmartComponentProps<StoreFeedbackInfo>) {
    if (props.store.errorGettingData) {
        return (
            <StubErrorGetData errorText={props.store.errorGettingData}/>
        );
    }

    const currentUserFeedback: UserFeedbackProgressCommon | undefined = props.store.userFeedbackData;
    if (!currentUserFeedback) {
        return (
            <div className={styles.loaderContainer}>
                <LoaderSpinner loadingText={'Получение информации о достижениях пользователя'}/>
            </div>
        );
    }

    return (
        <div className={styles.historyListContainer}>
            <UserFeedbackProgress
                label={'Выполнение проектов'}
                title={'Проекты'}
                theme={'orange'}
                progress={currentUserFeedback.project}
            />
            <UserFeedbackProgress
                label={'Записи NearMiss'}
                title={'NM'}
                theme={'green'}
                progress={currentUserFeedback.NM}
            />
            <UserFeedbackProgress
                label={'Записи SEV'}
                title={'SEV'}
                theme={'blue'}
                progress={currentUserFeedback.SEV}
            />
        </div>
    );
}

export default observer(UserFeedbackList);
