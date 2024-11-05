import React from "react";
import styles from "./siteTopMenuItemNavigationStyle.scss";

const TEXT_MENU_ITEM_NAVIGATION: string = 'Навигация';

interface SiteTopMenuItemNavigationProps {
    readonly eventToggleNavigationMenu: () => void;
}

/**
 * Контент верхнего меню "Навигация"
 * @param props
 * @constructor
 */
function SiteTopMenuItemNavigation(props: SiteTopMenuItemNavigationProps){
    return (
        <>
            <span
                className={`${styles.buttonNavigation} ${styles.fullSizeBtn}`}
                onClick={props.eventToggleNavigationMenu}
            >
                {TEXT_MENU_ITEM_NAVIGATION}
            </span>
            <span
                title={TEXT_MENU_ITEM_NAVIGATION}
                className={`${styles.mobileBtn} ${styles.mobileBtnNavigation}`}
                onClick={props.eventToggleNavigationMenu}
            />
        </>
    );
}

export default React.memo(SiteTopMenuItemNavigation);
