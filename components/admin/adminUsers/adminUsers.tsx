import {observer} from "mobx-react";
import React, {useState} from "react";
import {dateFormatForView} from "ts-common-helpers";
import {fixedLengthString} from "../../../helpers/fixedLengthString";
import {AdminEmployee} from "../../../interfaces/api/adminEmployee";
import {SmartComponentProps} from "../../../interfaces/smartComponentProps";
import {StoreAdminPageContentUsers} from "../../../stores/admin/users/storeAdminPageContentUsers";
import {DropdownSelectItem} from "../../common/dropdownSelect/dropdownSelect";
import {ItemsContainer} from "../../common/itemsContainer";
import {StubEmptyData} from "../../common/stubEmptyData";
import {AdminLabelWithContainerLine} from "../adminLabelWithContainerLine";
import {AdminListItemContainer} from "../adminListItemContainer";
import {AdminActionButtonsProps} from "../adminListItemContainer/adminListItemContainer";
import styles from './adminUsersStyle.scss';

//region Список Ролей
interface UserRolesItemsListProps {
    userRolesList: DropdownSelectItem<string>[];
}

const UserRolesItemsList = React.memo((props: UserRolesItemsListProps) => {
    if (!props.userRolesList.length) {
        return (<span>{'Список ролей отсутствует'}</span>)
    }

    const rolesElementsList: React.ReactNode[] = [];

    for (let i = 0; i < props.userRolesList.length; ++i) {
        rolesElementsList.push(
            <span
                key={props.userRolesList[i].value}
                className={styles.simpleListItem}
                title={props.userRolesList[i].label}
            >
                {
                    fixedLengthString({
                        maxLength: 25,
                        stringToFixed: props.userRolesList[i].label
                    })
                }
            </span>
        );
    }

    return (
        <>
            {rolesElementsList}
        </>
    );
});
//endregion

//region Скрыть/показать детальную информацию о пользователе
interface ShowHideDetailUserInfoProps {
    readonly isOpen: boolean;
    readonly eventToggleOpenClose: () => void;
}

const ShowHideDetailUserInfo = React.memo((props: ShowHideDetailUserInfoProps) => {
    const publicText: string = props.isOpen ? 'Свернуть детальную информацию' : 'Показать детальную информацию';
    const cssClassStatus: string = props.isOpen ? styles.buttonShowDetailUserInfoOpen : styles.buttonShowDetailUserInfoClose;
    return (
        <div className={styles.buttonShowDetailUserInfoContainer}>
            <span
                className={`${cssClassStatus} ${styles.buttonShowDetailUserInfo}`}
                onClick={props.eventToggleOpenClose}>
                {publicText}
            </span>
        </div>
    );
});
//endregion

//region Элемент списка, информация о текущем пользователе
interface SystemUserInfoProps extends AdminActionButtonsProps {
    readonly userInfo: AdminEmployee;
    readonly eventShowPopupGetEmployeeHistoryUser: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SystemUserInfo = observer((props: SystemUserInfoProps) => {
    const [isOpenDetailInfo, setOpenDetailInfo] = useState(false);

    const eventDetailInfo = () => {
        setOpenDetailInfo(!isOpenDetailInfo);
    }

    return (
        <AdminListItemContainer
            className={styles.itemUser}
            itemId={props.userInfo.uuid}
            eventStartEdit={props.eventStartEdit}
            eventDeleteItem={props.eventDeleteItem}
        >
            <div className={styles.userFullName}>
                {props.userInfo.fullName}
            </div>
            <AdminLabelWithContainerLine label={'Дата рождения:'}>
                {
                    dateFormatForView({
                        date: props.userInfo.birthDate,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })
                }
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Завод:'}>
                {props.userInfo.factoryPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Подразделение:'}>
                {props.userInfo.unitPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Должность:'}>
                {props.userInfo.positionPublicName}
            </AdminLabelWithContainerLine>

            <AdminLabelWithContainerLine label={'Руководитель:'}>
                {props.userInfo.headPublicName}
            </AdminLabelWithContainerLine>
            {
                isOpenDetailInfo ?
                    <>
                        <AdminLabelWithContainerLine label={'Дата приема на работу:'}>
                            {
                                dateFormatForView({
                                    date: props.userInfo.employmentDate,
                                    format: 'DD.MM.YYYY',
                                    defaultValue: '-'
                                })
                            }
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Логин:'}>
                            {props.userInfo.authLogin}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'E-Mail:'}>
                            {props.userInfo.email}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Страна:'}>
                            {props.userInfo.country}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Город:'}>
                            {props.userInfo.city}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Табельный номер:'}>
                            {props.userInfo.personnelNumber}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Номер телефона:'}>
                            {props.userInfo.phoneNumber}
                        </AdminLabelWithContainerLine>

                        <AdminLabelWithContainerLine label={'Роли в системе:'}>
                            <UserRolesItemsList userRolesList={props.userInfo.systemUserRolesList}/>
                        </AdminLabelWithContainerLine>
                    </>
                    : null
            }
            {
                props.userInfo.isNeedChangePassword ?
                    <div className={styles.needChangePasswordContainer}>
                        <span className={styles.needChangePassword}>
                            {'Внимание! Пароль сотрудника сброшен'}
                        </span>
                        <div
                            className={styles.needChangePasswordHelpText}>{'При следующей авторизации, сотруднику будет предложено задать новый пароль'}</div>
                    </div> : null
            }

            <div>
                <ShowHideDetailUserInfo
                    isOpen={isOpenDetailInfo}
                    eventToggleOpenClose={eventDetailInfo}
                />

                <div className={styles.buttonShowHistoryUserInfoContainer}>
                    <span
                        data-id={props.itemId}
                        className={styles.buttonShowHistoryUserInfo}
                        onClick={props.eventShowPopupGetEmployeeHistoryUser}
                    >
                        {'Показать историю изменения'}
                    </span>
                </div>
            </div>
        </AdminListItemContainer>
    );
});

//endregion

function AdminUsers(props: SmartComponentProps<StoreAdminPageContentUsers>) {
    const dataOnCurrentPage: AdminEmployee[] = props.store.storeDataPagination.dataOnCurrentPage;

    if (!dataOnCurrentPage.length) {
        return (
            <StubEmptyData emptyDataText={'Отсутствуют пользователи для отображения'}/>
        );
    }

    const usersListElements: JSX.Element[] = [];

    for (let i = 0; i < dataOnCurrentPage.length; ++i) {
        usersListElements.push(
            <SystemUserInfo
                key={dataOnCurrentPage[i].uuid}
                userInfo={dataOnCurrentPage[i]}
                itemId={dataOnCurrentPage[i].uuid}
                eventStartEdit={props.store.eventStartChangeItem}
                eventDeleteItem={props.store.eventStartDeleteItem}
                eventShowPopupGetEmployeeHistoryUser={props.store.eventShowPopupGetEmployeeHistoryUser}
            />
        );
    }

    return (
        <ItemsContainer viewItems={props.store.storeSelectViewCatalog.isActiveViewGrid ? '2_column' : '1_column'}>
            {usersListElements}
        </ItemsContainer>
    );
}

export default observer(AdminUsers);
