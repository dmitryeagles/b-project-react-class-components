import {observer} from "mobx-react";
import React from "react";
import CsvIco from "../../../../img/svg_component/csv.svg";
import DownloadIco from '../../../../img/svg_component/download.svg';
import UserPlusIco from '../../../../img/svg_component/userPlus.svg';
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreAdminPageContentUsers} from "../../../../stores/admin/users/storeAdminPageContentUsers";
import {LinkAsButton} from "../../../common/linkAsButton";
import {StandardButton} from "../../../common/standardButton";
import styles from './adminUsersActionButtonsStyle.scss';

function AdminUsersActionButtons(props: SmartComponentProps<StoreAdminPageContentUsers>) {
    return (
        <div className={styles.componentContainer}>
            <StandardButton
                iconLeft={<UserPlusIco/>}
                eventClick={props.store.eventStartAddNewItem}
                text={'Добавить сотрудника'}
            />

            <LinkAsButton
                iconLeft={<DownloadIco/>}
                isRealLink={true}
                isDownload={true}
                href={'/File/ExportUsersToCSV'}
                text={'Экспорт сотрудников'}
            />

            <StandardButton
                iconLeft={<CsvIco/>}
                eventClick={props.store.eventShowPopupAddUsersFromFile}
                text={'Загрузить сотрудников'}
            />
        </div>
    );
}

export default observer(AdminUsersActionButtons);
