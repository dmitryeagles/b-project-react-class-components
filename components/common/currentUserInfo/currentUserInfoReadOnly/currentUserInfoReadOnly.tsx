import {observer} from "mobx-react";
import React from "react";
import {dateFormatForView} from "ts-common-helpers";
import {SmartComponentProps} from "../../../../interfaces/smartComponentProps";
import {StoreCurrentUserInfo} from "../../../../stores/common/storeCurrentUserInfo";
import {LoaderSpinner} from "../../loaderSpinner";
import EmulationInputReadOnly from "../emulationInputReadOnly/emulationInputReadOnly";
import styles from './currentUserInfoReadOnlyStyle.scss';

interface CategoryTitleProps {
    readonly title: string;
    readonly isPaddingTopTitle?: boolean;
    readonly children: React.ReactNode;
    readonly className?: string;
}

export const CategoryContainer = React.memo((props: CategoryTitleProps) => {
    let cssClassContainer: string = styles.userPersonalDataTitle;

    if (props.isPaddingTopTitle) {
        cssClassContainer = `${styles.userPersonalDataTitle} ${styles.paddingTopTitle}`;
    }

    return (
        <div>
            <div className={cssClassContainer}>
                {props.title}
            </div>
            <div className={props.className ? props.className : styles.userInfoContainer}>
                {props.children}
            </div>
        </div>
    );
});


function CurrentUserInfoReadOnly(props: SmartComponentProps<StoreCurrentUserInfo>) {
    const currentUserInfo = props.store.currentUserInfo;
    if (!currentUserInfo) {
        return (
            <div className={styles.loaderContainer}>
                <LoaderSpinner loadingText={'Получение информации о текущем пользователе'}/>
            </div>
        );
    }

    return (
        <div>
            <CategoryContainer
                title={'Личные данные сотрудника'}
            >
                <EmulationInputReadOnly
                    label={'Фамилия'}
                    value={currentUserInfo.surname}
                />
                <EmulationInputReadOnly
                    label={'Имя'}
                    value={currentUserInfo.name}
                />
                <EmulationInputReadOnly
                    label={'Отчество'}
                    value={currentUserInfo.patronymic}
                />

                <EmulationInputReadOnly
                    label={'Дата рождения'}
                    value={dateFormatForView({
                        date: currentUserInfo.birthDate,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                />

                <EmulationInputReadOnly
                    label={'Город'}
                    value={currentUserInfo.city}
                />
                <EmulationInputReadOnly
                    label={'Страна'}
                    value={currentUserInfo.country}
                />

                <EmulationInputReadOnly
                    label={'Телефон'}
                    value={currentUserInfo.phoneNumber}
                />
            </CategoryContainer>

            <CategoryContainer
                title={'Рабочая информация'}
                isPaddingTopTitle={true}
            >
                <EmulationInputReadOnly
                    label={'Завод'}
                    value={currentUserInfo.factory?.label ?? '-'}
                />

                <EmulationInputReadOnly
                    label={'Должность'}
                    value={currentUserInfo.jobTitle?.label ?? '-'}
                />

                <EmulationInputReadOnly
                    label={'Подразделение'}
                    value={currentUserInfo.subdivision?.label ?? '-'}
                />

                <EmulationInputReadOnly
                    label={'Табельный номер'}
                    value={currentUserInfo.personnelNumber}
                />
                <EmulationInputReadOnly
                    label={'Руководитель'}
                    value={currentUserInfo.supervisor?.label ?? '-'}
                />

                <EmulationInputReadOnly
                    label={'Дата приема на работу'}
                    value={dateFormatForView({
                        date: currentUserInfo.employmentDate,
                        format: 'DD.MM.YYYY',
                        defaultValue: '-'
                    })}
                />
            </CategoryContainer>

            <CategoryContainer
                title={'Система'}
                isPaddingTopTitle={true}
            >
                <EmulationInputReadOnly
                    label={'Логин'}
                    value={currentUserInfo.authLogin}
                />

                <EmulationInputReadOnly
                    label={'Email'}
                    value={currentUserInfo.email}
                />

                <EmulationInputReadOnly
                    label={'Роли в системе'}
                    value={currentUserInfo.systemRolesNamesStr}
                />
            </CategoryContainer>
        </div>
    );
}

export default observer(CurrentUserInfoReadOnly);
