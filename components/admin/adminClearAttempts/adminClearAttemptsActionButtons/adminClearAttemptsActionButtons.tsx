import {observer} from "mobx-react";
import React, {useState} from "react";
import TrashIco from "../../../../img/svg_component/trash.svg";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {
    StoreAdminPageContentClearAttempts
} from "../../../../stores/admin/clearAttempts/storeAdminPageContentClearAttempts";
import {StoreBooleanFlag} from "../../../../stores/common/storeBooleanFlag";
import {CheckboxButton} from "../../../common/checkboxButton";
import {StandardButton} from "../../../common/standardButton";
import {AdminFilterEditorDropdown} from "../adminFilterEditorDropdown";
import styles from './adminClearAttemptsActionButtonsStyle.scss';


const CheckByAttestation = observer((props: SmartComponentProps<StoreBooleanFlag>) =>
    <CheckboxButton
        publicText={'Учитывать аттестацию'}
        isChecked={props.store.status}
        eventCheck={props.store.toggleStatus}
    />
);
const CheckByNewEmployees = observer((props: SmartComponentProps<StoreBooleanFlag>) =>
    <CheckboxButton
        publicText={'Учитывать назначенное тестирование'}
        isChecked={props.store.status}
        eventCheck={props.store.toggleStatus}
    />
);

//region Скрыть/показать детальную информацию о пользователе
interface ShowHideDetailUserInfoProps {
    readonly isOpen: boolean;
    readonly eventToggleOpenClose: () => void;
}

const ShowHideDetailUserInfo = React.memo((props: ShowHideDetailUserInfoProps) => {
    const publicText: string = props.isOpen ? 'Свернуть параметры' : 'Дополнительные параметры очистки';
    const cssClassStatus: string = props.isOpen ? styles.buttonShowDetailUserInfoOpen : styles.buttonShowDetailUserInfoClose;
    return (
        <div
            className={styles.buttonShowDetailUserInfoContainer}
            onClick={props.eventToggleOpenClose}>
            <span
                className={`${cssClassStatus} ${styles.buttonShowDetailUserInfo}`}>
                {publicText}
            </span>
        </div>
    );
});
//endregion



function AdminClearAttemptsActionButtons(props: SmartComponentProps<StoreAdminPageContentClearAttempts>) {
    const [isOpenDetailInfo, setOpenDetailInfo] = useState(false);

    const eventDetailInfo = () => {
        setOpenDetailInfo(!isOpenDetailInfo);
    }
    return (
        <div className={styles.componentContainer}>

                <div className={styles.btnContainer}>
                    <div className={styles.btnContainerItem}>
                        <p> {'Очистить все попытки'}</p>
                        <StandardButton
                            className={styles.iconBtn}
                            iconLeft={<TrashIco/>}
                            eventClick={props.store.eventDeleteAll}
                            text={''}
                        />
                    </div>
                    <div className={styles.btnContainerItem}>
                        <p>{'Очистить все попытки по назначенным тестам'}</p>
                        <StandardButton
                            className={styles.iconBtn}
                            iconLeft={<TrashIco/>}
                            eventClick={props.store.eventDeleteAllAssignation}
                            text={''}
                        />
                    </div>
                </div>
            { isOpenDetailInfo ?
            <div className={styles.showHideContainer}>
                <div className={styles.isActiveContainer}>
                    <div className={styles.editorWrapper}>
                        <CheckByAttestation store={props.store.storeEditorCheckByAttestation}/>
                    </div>

                    <div className={styles.editorWrapper}>
                        <CheckByNewEmployees store={props.store.storeEditorCheckByNewEmployees}/>
                    </div>
                </div>
                <div className={styles.btnContainerItemDescription}>
                    <p>{'Очистить все попытки по выбранному пользователю и тесту'}</p>
                    <div className={styles.dropdownTestAndUserContainer}>
                        <AdminFilterEditorDropdown
                            storeComponentDropdown={props.store.storeDropdownSelectUserForTest}
                        />
                        <AdminFilterEditorDropdown
                            storeComponentDropdown={props.store.storeDropdownSelectTest}
                        />
                        <StandardButton
                            className={styles.iconBtn}
                            iconLeft={<TrashIco/>}
                            eventClick={props.store.eventDeleteByUserAndTest}
                            text={''}
                        />
                    </div>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.btnContainerItemDescription}>
                        <p>{'Очистить все попытки по выбранной аттестации'}</p>
                        <div className={styles.dropdownContainer}>
                            <AdminFilterEditorDropdown
                                storeComponentDropdown={props.store.storeDropdownSelectAttestation}
                            />
                            <StandardButton
                                className={styles.iconBtn}
                                iconLeft={<TrashIco/>}
                                eventClick={props.store.eventDeleteByAttestation}
                                text={''}
                            />
                        </div>
                    </div>
                    <div className={styles.btnContainerItemDescription}>
                        <p>{'Очистить все попытки по выбранному заводу'}</p>
                        <div className={styles.dropdownContainer}>
                            <AdminFilterEditorDropdown
                                storeComponentDropdown={props.store.storeDropdownSelectFactory}
                            />
                            <StandardButton
                                className={styles.iconBtn}
                                iconLeft={<TrashIco/>}
                                eventClick={props.store.eventDeleteByFactory}
                                text={''}
                            />
                        </div>
                    </div>
                    <div className={styles.btnContainerItemDescription}>
                        <p>{'Очистить все попытки по выбранной должности'}</p>
                        <div className={styles.dropdownContainer}>
                            <AdminFilterEditorDropdown
                                storeComponentDropdown={props.store.storeDropdownSelectPositions}
                            />
                            <StandardButton
                                className={styles.iconBtn}
                                iconLeft={<TrashIco/>}
                                eventClick={props.store.eventDeleteByPosition}
                                text={''}
                            />
                        </div>
                    </div>
                    <div className={styles.btnContainerItemDescription}>
                        <p>{'Очистить все попытки по выбранному подразделению'}</p>
                        <div className={styles.dropdownContainer}>
                        <AdminFilterEditorDropdown
                            storeComponentDropdown={props.store.storeDropdownSelectUnits}
                        />
                        <StandardButton
                            className={styles.iconBtn}
                            iconLeft={<TrashIco/>}
                            eventClick={props.store.eventDeleteByUnit}
                            text={''}
                        />
                        </div>
                    </div>
                    <div className={styles.btnContainerItemDescription}>
                        <p>{'Очистить все попытки по выбранному пользователю'}</p>
                        <div className={styles.dropdownContainer}>
                            <AdminFilterEditorDropdown
                                storeComponentDropdown={props.store.storeDropdownSelectUser}
                            />
                            <StandardButton
                                className={styles.iconBtn}
                                iconLeft={<TrashIco/>}
                                eventClick={props.store.eventDeleteByUser}
                                text={''}
                            />
                        </div>
                    </div>
                </div>
            </div>:null
           }
            <div>
                <ShowHideDetailUserInfo
                    isOpen={isOpenDetailInfo}
                    eventToggleOpenClose={eventDetailInfo}
                />
            </div>
    </div>
    );
}

export default observer(AdminClearAttemptsActionButtons);
