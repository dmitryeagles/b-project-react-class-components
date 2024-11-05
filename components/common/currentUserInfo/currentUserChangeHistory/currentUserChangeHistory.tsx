import {observer} from "mobx-react";
import React from "react";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreUserHistory} from "../../../../stores/common/storeUserHistory";
import {UserChangeHistoryList} from "../../userChangeHistoryList";
import {CategoryContainer} from "../currentUserInfoReadOnly/currentUserInfoReadOnly";
import styles from './currentUserChangeHistoryStyle.scss';

function CurrentUserChangeHistory(props: SmartComponentProps<StoreUserHistory>) {
    return (
        <CategoryContainer
            title={'История изменения сотрудника'}
            isPaddingTopTitle={true}
            className={styles.historyCategoryContainer}
        >
            <UserChangeHistoryList
                store={props.store}
            />
        </CategoryContainer>
    );
}

export default observer(CurrentUserChangeHistory);
