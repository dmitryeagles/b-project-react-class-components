import {observer} from "mobx-react";
import React from "react";
import CancelIco from '../../../../img/svg_component/cancel.svg'
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentUsers} from "../../../../stores/admin/users/storeAdminPageContentUsers";
import {
    StoreAdminPopupGetEmployeeHistoryUser
} from "../../../../stores/admin/users/storeAdminPopupGetEmployeeHistoryUser";
import {StandardButton} from "../../../common/standardButton";
import {UserChangeHistoryList} from "../../../common/userChangeHistoryList";
import {AdminPopup} from "../../adminPopup";
import styles from './adminPopupGetEmployeeHistoryUserStyle.scss';

const PopupGetEmployeeHistoryUser = React.memo((props: SmartComponentProps<StoreAdminPopupGetEmployeeHistoryUser>) => {
    return (
        <AdminPopup
            popupTitle={`История изменения сотрудника ${props.store.userFullName}`}
            eventClosePopup={props.store.eventClosePopup}
            classNameContentContainer={styles.adminPopupContainer}
        >
            <UserChangeHistoryList store={props.store.storeUserHistory}/>
            <div className={styles.buttonsContainer}>
                <StandardButton
                    eventClick={props.store.eventClosePopup}
                    iconLeft={<CancelIco/>}
                    text={'Закрыть'}
                />
            </div>
        </AdminPopup>
    );
});


function AdminPopupGetEmployeeHistoryUser(props: SmartComponentProps<StoreAdminPageContentUsers>) {
    if (!props.store.storePopupGetEmployeeHistoryUser) {
        return null
    }

    return (
        <PopupGetEmployeeHistoryUser store={props.store.storePopupGetEmployeeHistoryUser}/>
    );
}

export default observer(AdminPopupGetEmployeeHistoryUser);
