import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreFeedbackInfo} from "../../../../stores/common/storeFeedbackInfo";
import UserFeedbackList from "../../userFeedbackList/userFeedbackList";
import {CategoryContainer} from "../currentUserInfoReadOnly/currentUserInfoReadOnly";
import styles from './currentUserFeedbackStyle.scss';

function CurrentUserFeedback(props: SmartComponentProps<StoreFeedbackInfo>) {
    return (
        <CategoryContainer
            title={'Прогресс'}
            isPaddingTopTitle={true}
            className={styles.historyCategoryContainer}
        >
            <UserFeedbackList
                store={props.store}
            />
        </CategoryContainer>
    );
}

export default observer(CurrentUserFeedback);
