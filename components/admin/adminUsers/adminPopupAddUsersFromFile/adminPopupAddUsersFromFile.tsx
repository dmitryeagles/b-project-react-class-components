import {observer} from "mobx-react";
import React from "react";
import UploadIco from '../../../../img/svg_component/upload.svg'
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentUsers} from "../../../../stores/admin/users/storeAdminPageContentUsers";
import {StoreAdminPopupAddUsersFromFile} from "../../../../stores/admin/users/storeAdminPopupAddUsersFromFile";
import {StandardButton} from "../../../common/standardButton";
import {AdminPopup} from "../../adminPopup";
import {AdminUsersSelectedFile} from "../index";
import styles from './adminPopupAddUsersFromFileStyle.scss';

const PopupAddUsersFromFile = React.memo((props: SmartComponentProps<StoreAdminPopupAddUsersFromFile>) => {
    return (
        <AdminPopup
            popupTitle={'Загрузить сотрудников из файла'}
            eventClosePopup={props.store.eventClosePopup}
            className={styles.popupContainer}
        >
            <div>{'Требуемый тип файла - csv. Требуемая кодировка файла - UTF-8.'}</div>
            <div className={styles.startSelectedFileContainer}>
                <AdminUsersSelectedFile store={props.store.storeSelectedFile}/>
            </div>

            <div className={styles.buttonsContainer}>
                <StandardButton
                    eventClick={props.store.eventSaveData}
                    iconLeft={<UploadIco/>}
                    text={'Загрузить'}
                />
            </div>
        </AdminPopup>
    );
});


function AdminPopupAddUsersFromFile(props: SmartComponentProps<StoreAdminPageContentUsers>) {
    if (!props.store.storePopupAddUsersFromFile) {
        return null
    }

    return (
        <PopupAddUsersFromFile store={props.store.storePopupAddUsersFromFile}/>
    );
}

export default observer(AdminPopupAddUsersFromFile);
