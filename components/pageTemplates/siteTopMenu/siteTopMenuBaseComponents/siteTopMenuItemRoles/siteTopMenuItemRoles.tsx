import {observer} from "mobx-react";
import React from "react";
import {StoreCurrentUserInfo} from "../../../../../stores/common/storeCurrentUserInfo";
import styles from "./siteTopMenuItemRolesStyle.scss";

const TEXT_MENU_ITEM_ROLES: string = 'Роли';

interface ItemRolesProps {
    readonly eventToggleNavigationMenu: () => void;
}

function ItemRoles(props: ItemRolesProps) {
    return (
        <>
            <span
                className={`${styles.buttonRoles} ${styles.fullSizeBtn}`}
                onClick={props.eventToggleNavigationMenu}
            >
                {TEXT_MENU_ITEM_ROLES}
            </span>
            <span
                title={TEXT_MENU_ITEM_ROLES}
                className={`${styles.mobileBtn} ${styles.mobileBtnRoles}`}
                onClick={props.eventToggleNavigationMenu}
            />
        </>
    );
}


interface SiteTopMenuItemRolesProps extends ItemRolesProps {
    readonly storeCurrentUserInfo: StoreCurrentUserInfo;
}

/**
 * Контент верхнего меню "Роли"
 * @param props
 * @constructor
 */
function SiteTopMenuItemRoles(props: SiteTopMenuItemRolesProps) {
    if (!props.storeCurrentUserInfo.currentUserInfo) {
        return null;
    }

    if (props.storeCurrentUserInfo.currentUserInfo.rolesCount.admin > 0) {
        return (<ItemRoles eventToggleNavigationMenu={props.eventToggleNavigationMenu}/>);
    }

    return null;
}

export default observer(SiteTopMenuItemRoles);
