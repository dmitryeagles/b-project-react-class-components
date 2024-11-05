import {observer} from "mobx-react";
import React from "react";
import {ROUTER_REAL_PAGES_PATHS} from "../../../../../staticData/routerPages/routerRealPages";
import {StoreCurrentUserInfo} from "../../../../../stores/common/storeCurrentUserInfo";
import {SiteTopMenuNavigationMenuOpenContainer} from "../siteTopMenuNavigationMenuOpenContainer";
import styles from './siteTopMenuNavigationMenuRolesStyle.scss';

interface UserRoleLinkProps {
    readonly rolePublicName: string;
    readonly linkToRoleArea: string;
}

function UserRoleLink(props: UserRoleLinkProps) {
    return (
        <a
            className={styles.navigationLink}
            href={props.linkToRoleArea}
        >
            {props.rolePublicName}
        </a>
    );
}

interface SiteTopMenuNavigationMenuRolesProps {
    readonly eventCloseNavigationMenu: () => void;
    readonly storeCurrentUserInfo: StoreCurrentUserInfo;
}

function SiteTopMenuNavigationMenuRoles(props: SiteTopMenuNavigationMenuRolesProps) {

    if (!props.storeCurrentUserInfo.currentUserInfo) {
        return (<div>{'Загрузка...'}</div>)
    }

    if (props.storeCurrentUserInfo.currentUserInfo.rolesCount.all <= 0) {
        return (<div>{'Роли отсутствуют'}</div>)
    }

    return (
        <SiteTopMenuNavigationMenuOpenContainer
            eventClose={props.eventCloseNavigationMenu}
        >
            <UserRoleLink
                linkToRoleArea={ROUTER_REAL_PAGES_PATHS.admin}
                rolePublicName={'Администратор'}
            />
            <UserRoleLink
                linkToRoleArea={ROUTER_REAL_PAGES_PATHS.common}
                rolePublicName={'Сотрудник'}
            />
        </SiteTopMenuNavigationMenuOpenContainer>
    );
}

export default observer(SiteTopMenuNavigationMenuRoles);
